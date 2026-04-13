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

  // collect events first, temporary array
  const events = [];

  // loop through the events in the planner and add them to temp array
  for (const eventId of planner) {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (eventSnap.exists()) {
      const event = eventSnap.data();
      // add every element from the event collection into temp array
      events.push({
        id: eventId,
        ...event,
      });
    }
  }

  // sort the events by date
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  // now the events array is sorted by date, loop through each one and create the card to display in order
  events.forEach((event) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5";

    card.innerHTML = `
    <div class="flex flex-col md:flex-row gap-4">
      
      <!-- Image -->
      <div class="w-full md:w-[220px] flex-shrink-0">
        <img
          src="${event.previmage}"
          alt="${event.name}"
          class="w-full h-48 md:h-40 object-cover rounded-lg"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col justify-between">
        
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            ${event.name}
          </h2>

          <p class="text-gray-600 mb-2">
            ${new Date(event.date).toLocaleString()}
          </p>

<p class="text-gray-700 mb-2">
  ${event.descShort}
</p>

<p class="text-gray-500 text-sm mb-2">
  📍 ${event.address}
</p>

          <p class="text-gray-700 font-medium mb-4">
            Type: ${event.type}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex flex-wrap gap-2 mt-2">
          
          <button
            class="removeBtn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            data-id="${event.id}"
          >
            Remove
          </button>

          <a
            href="eventGeneric.html?docID=${event.id}"
            class="bg-[#00C7A9] hover:bg-[#00b39a] text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Read More
          </a>

          <a
            href="map.html?docID=${event.id}"
            class="bg-[#00C7A9] hover:bg-[#00b39a] text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            View on Map
          </a>

        </div>
      </div>
    </div>
  `;

    plannerContainer.appendChild(card);
  });

  // After all cards are created, attach event listeners to remove buttons
  attachRemoveButtons();
}

// Function that attaches click listeners to all remove buttons
function attachRemoveButtons() {
  // Select all buttons with class "removeBtn"
  const buttons = document.querySelectorAll(".removeBtn");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      // Get the event ID stored in the button's data-id attribute
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
