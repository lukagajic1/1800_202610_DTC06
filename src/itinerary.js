import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
} from "firebase/firestore";

// Get the HTML element where all event cards will be displayed
const eventsContainer = document.getElementById("eventsContainer");
const viewMoreBtn = document.getElementById("viewMoreBtn");

// Variable to store the currently logged-in user
let currentUser = null;

// store all events for pagination
let allEvents = [];

// pagination settings
const eventsPerLoad = 4;
let visibleEvents = 4;

// check if logged in, set current user to the logged in user
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  await loadEvents();
});

// Function to load all events from the Firestore "events" collection
async function loadEvents() {
  // Clear the container before displaying events
  eventsContainer.innerHTML = "";

  // Get all documents from the "events" collection and store in snapshot, ordered by date in ascending order
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snapshot = await getDocs(q);

  // Reset array
  allEvents = [];

  // Loop through each event document, docsnap is the doc object containing the event data and data id
  snapshot.forEach((docSnap) => {
    // Get the data stored in the current event document
    const event = docSnap.data();

    // Get the unique document ID of the event
    const eventId = docSnap.id;

    // Store event in array for pagination
    allEvents.push({
      id: eventId,
      ...event,
    });
  });

  // Reset visible count
  visibleEvents = eventsPerLoad;

  // Render events
  renderEvents();
}

// render function , shows 4 events at a time
function renderEvents() {
  // Clear container
  eventsContainer.innerHTML = "";

  // Only show a subset of events
  const eventsToShow = allEvents.slice(0, visibleEvents);

  eventsToShow.forEach((event) => {
    // create div element to hold the event card
    const card = document.createElement("div");
    card.className = "border rounded p-4 mb-4 bg-white";

    card.innerHTML = `
        <img src="${event.previmage}" width="200">
        <h2 class="text-xl font-bold">${event.name}</h2>
<p>${new Date(event.date).toLocaleString()}</p>        <p>${event.descShort}</p>
        <p>Type: ${event.type}</p>
        <button class="addBtn bg-teal-500 text-white px-3 py-1 rounded mt-2" data-id="${event.id}">
          Add to Planner
        </button>
      `;

    eventsContainer.appendChild(card);
  });

  // after creating the cards, add event listener to each button to add to itinerary
  attachAddButtons();

  // show/hide View More button
  if (visibleEvents >= allEvents.length) {
    viewMoreBtn.classList.add("hidden");
  } else {
    viewMoreBtn.classList.remove("hidden");
  }
}

// View More click handler
viewMoreBtn.addEventListener("click", () => {
  visibleEvents += eventsPerLoad;
  renderEvents();
});

// Function to add click event listeners to every "Add to Planner" button
function attachAddButtons() {
  // Select all buttons with class "addBtn"
  const buttons = document.querySelectorAll(".addBtn");
  // Loop through each button

  buttons.forEach((button) => {
    // Add a click event listener

    button.addEventListener("click", async () => {
      // Get the event ID stored in the button's data-id attribute

      const eventId = button.dataset.id;
      // run the addtoplanner function after collecting all information
      await addToPlanner(eventId);
    });
  });
}

// Function that adds an event to the logged-in user's planner
async function addToPlanner(eventId) {
  if (!currentUser) {
    alert("Please log in first");
    return;
  }
  // Create a reference to the current user's document in the "users" collection
  const userRef = doc(db, "users", currentUser.uid);

  // Get the user's document from Firestore
  const userSnap = await getDoc(userRef);

  // if they do not have a planner collection creates one
  if (!userSnap.exists()) {
    // Create the user document and start the planner array with this event ID
    await setDoc(userRef, { planner: [eventId] });
  } else {
    // If the document already exists, add the event ID to the planner array
    await updateDoc(userRef, {
      // arrayUnion prevents duplicate event IDs and adds to planner array if unique id
      planner: arrayUnion(eventId),
    });
  }

  alert("Added to planner");
}
