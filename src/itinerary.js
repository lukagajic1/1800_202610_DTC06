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

const eventsContainer = document.getElementById("eventsContainer");
const viewMoreBtn = document.getElementById("viewMoreBtn");

let currentUser = null;

let allEvents = [];

const eventsPerLoad = 4;
let visibleEvents = 4;

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  await loadEvents();
});

async function loadEvents() {
  eventsContainer.innerHTML = "";

  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snapshot = await getDocs(q);

  allEvents = [];

  snapshot.forEach((docSnap) => {
    const event = docSnap.data();
    const eventId = docSnap.id;

    allEvents.push({
      id: eventId,
      ...event,
    });
  });

  visibleEvents = eventsPerLoad;

  renderEvents();
}

function renderEvents() {
  eventsContainer.innerHTML = "";

  const eventsToShow = allEvents.slice(0, visibleEvents);

  eventsToShow.forEach((event) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow border border-gray-200 p-4 md:p-5";

    card.innerHTML = `
      <div class="flex flex-col md:flex-row gap-4">
        
        <div class="w-full md:w-[220px] flex-shrink-0">
          <img
            src="${event.previmage}"
            alt="${event.name}"
            class="w-full h-48 md:h-40 object-cover rounded-lg"
          />
        </div>

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

          <div class="flex flex-wrap gap-2 mt-2">
            <button
              class="addBtn bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition"
              data-id="${event.id}"
            >
              Add to Planner
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

    eventsContainer.appendChild(card);
  });

  attachAddButtons();

  if (visibleEvents >= allEvents.length) {
    viewMoreBtn.classList.add("hidden");
  } else {
    viewMoreBtn.classList.remove("hidden");
  }
}

viewMoreBtn.addEventListener("click", () => {
  visibleEvents += eventsPerLoad;
  renderEvents();
});

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
