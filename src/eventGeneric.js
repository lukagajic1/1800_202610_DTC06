import { db, auth } from "./firebaseConfig.js";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

function getDocIdFromUrl() {
  const params = new URL(window.location.href).searchParams;
  let returnValue = params.get("docID");
  console.log(returnValue);
  return returnValue;
}

async function displayEventInfo() {
  const id = getDocIdFromUrl();

  try {
    const eventRef = doc(db, "events", id);
    const eventSnap = await getDoc(eventRef);

    const event = eventSnap.data();
    const name = event.name;
    const previmage = event.previmage;
    const descLong = event.descLong;
    const address = event.address;

    //updates page
    document.getElementById("eventName").textContent = name;
    document.getElementById("eventDescription").textContent = descLong
    document.getElementById("eventAddress").textContent = `📍 ${address}`;

    const img = document.getElementById("eventImage");
    img.src = previmage;

    // add button class for clicking to add to itinerary to button
    const button = document.getElementById("addBtn");
    // add eventlistener to the button that will execute the addtoplanner function
    button.addEventListener("click", async () => {
      await addToPlanner(id);
    });
  } catch (error) {
    console.error("Error loading event", error);
    document.getElementById("eventName").textContent = "Error loading event";
  }
}

// Function that adds an event to the user's planner in Firestore
async function addToPlanner(eventId) {
  // check for log in
  if (!currentUser) {
    alert("Please log in first");
    return;
  }

  // Create a reference to the current user's document in the "users" collection
  const userRef = doc(db, "users", currentUser.uid);

  // Retrieve the user's document from Firestore
  const userSnap = await getDoc(userRef);

  // If the user document does not exist in Firestore
  if (!userSnap.exists()) {
    // Create the document and initialize the planner array with the current eventId as the first saved event
    await setDoc(userRef, { planner: [eventId] });
  } else {
    // If the user document already exists, add the eventId to the planner array

    await updateDoc(userRef, {
      // arrayUnion adds the eventId to the array and prevents duplicates
      planner: arrayUnion(eventId),
    });
  }
  alert("Added to planner");
}
displayEventInfo();
