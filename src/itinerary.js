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
} from "firebase/firestore";

const eventsContainer = document.getElementById("eventsContainer");
let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  await loadEvents();
});

async function loadEvents() {
  eventsContainer.innerHTML = "";

  const snapshot = await getDocs(collection(db, "events"));

  snapshot.forEach((docSnap) => {
    const event = docSnap.data();
    const eventId = docSnap.id;

    const card = document.createElement("div");
    card.className = "border rounded p-4 mb-4 bg-white";

    card.innerHTML = `
      <img src="${event.previmage}" width="200">
      <h2 class="text-xl font-bold">${event.name}</h2>
      <p>${event.date}</p>
      <p>${event.descShort}</p>
      <p>Type: ${event.type}</p>
      <button class="addBtn bg-teal-500 text-white px-3 py-1 rounded mt-2" data-id="${eventId}">
        Add to Planner
      </button>
    `;

    eventsContainer.appendChild(card);
  });

  attachAddButtons();
}

function attachAddButtons() {
  const buttons = document.querySelectorAll(".addBtn");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const eventId = button.dataset.id;
      await addToPlanner(eventId);
    });
  });
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
