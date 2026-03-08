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

    //updates page
    document.getElementById("eventName").textContent = name;
    const img = document.getElementById("eventImage");
    img.src = previmage;

    // add button class for clicking to add to itinerary to button
    const button = document.getElementById("addBtn");
    button.addEventListener("click", async () => {
      await addToPlanner(id);
    });
  } catch (error) {
    console.error("Error loading event", error);
    document.getElementById("eventName").textContent = "Error loading event";
  }
}

async function addToPlanner(eventId) {
  if (!currentUser) {
    alert("Please log in first");
    return;
  }

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, { planner: [eventId] });
  } else {
    await updateDoc(userRef, {
      planner: arrayUnion(eventId),
    });
  }

  alert("Added to planner");
}

displayEventInfo();
