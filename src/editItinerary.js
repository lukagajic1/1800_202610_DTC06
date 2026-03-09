import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

// select div to append the cards to
const plannerContainer = document.getElementById("plannerContainer");

// Variable to store the currently logged-in user
let currentUser = null;

// check if user is logged in, if they are set the current user to be "user", if not ask them to log in to view itinerary
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    plannerContainer.innerHTML = "<p>Please log in.</p>";
    return;
  }

  // If user is logged in, load their itinerary
  await loadPlanner();
});

// Function that loads all saved events from the user's planner
async function loadPlanner() {
  // initialize an empty planner space for the cards 
  plannerContainer.innerHTML = "";

  // Create a reference to the current user's document collection in Firestore
  const userRef = doc(db, "users", currentUser.uid);

  // Retrieve the user's document data from Firestore
  const userSnap = await getDoc(userRef);

  // If the user does not have any planner created, their collection does not exist yet
  if (!userSnap.exists()) {
    plannerContainer.innerHTML = "<p>No saved events yet.</p>";
    return;
  }

  // Retrieve the users itinerary from firestore or set it as an empty array if not created
  const planner = userSnap.data().planner || [];

  // If planner array is empty
  if (planner.length === 0) {
    plannerContainer.innerHTML = "<p>No saved events yet.</p>";
    return;
  }

  // Loop through every event ID stored in the planner array
  for (const eventId of planner) {
    // Create a reference to the event document in the "events" collection
    const eventRef = doc(db, "events", eventId);

    // Retrieve the event document data
    const eventSnap = await getDoc(eventRef);

    // Extract the event data
    const event = eventSnap.data();

    // Create a card to display events in planner
    const card = document.createElement("div");
    card.className = "border rounded p-4 mb-4 bg-white";
    card.innerHTML = `
      <img src="${event.previmage}" width="200">

      <h2 class="text-xl font-bold">${event.name}</h2>

      <p>${event.date}</p>

      <p>${event.descShort}</p>

      <p>Type: ${event.type}</p>

      <button class="removeBtn bg-red-500 text-white px-3 py-1 rounded mt-2"
              data-id="${eventId}">
        Remove
      </button>
    `;

    plannerContainer.appendChild(card);
  }

  // After all cards are created, attach event listeners to remove buttons
  attachRemoveButtons();
}

// Function that attaches click listeners to all remove buttons
function attachRemoveButtons() {
  // Select all buttons with class "removeBtn"
  const buttons = document.querySelectorAll(".removeBtn");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const eventId = button.dataset.id;
      await removeFromPlanner(eventId);
    });
  });
}

// Function that removes an event from the user's planner array in Firestore
async function removeFromPlanner(eventId) {
  // Create a reference to the current user's document
  const userRef = doc(db, "users", currentUser.uid);

  await updateDoc(userRef, {
    planner: arrayRemove(eventId),
  });

  // Reload the planner so the removed event disappears from the page
  await loadPlanner();
}
