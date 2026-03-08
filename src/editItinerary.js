import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

const plannerContainer = document.getElementById("plannerContainer");

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;

  if (!user) {
    plannerContainer.innerHTML = "<p>Please log in.</p>";
    return;
  }

  await loadPlanner();
});

async function loadPlanner() {
  plannerContainer.innerHTML = "";

  const userRef = doc(db, "users", currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    plannerContainer.innerHTML = "<p>No saved events yet.</p>";
    return;
  }

  const planner = userSnap.data().planner || [];

  if (planner.length === 0) {
    plannerContainer.innerHTML = "<p>No saved events yet.</p>";
    return;
  }

  for (const eventId of planner) {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) continue;

    const event = eventSnap.data();

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

  attachRemoveButtons();
}

function attachRemoveButtons() {
  const buttons = document.querySelectorAll(".removeBtn");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const eventId = button.dataset.id;

      await removeFromPlanner(eventId);
    });
  });
}

async function removeFromPlanner(eventId) {
  const userRef = doc(db, "users", currentUser.uid);

  await updateDoc(userRef, {
    planner: arrayRemove(eventId),
  });

  await loadPlanner();
}
