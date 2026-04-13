import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// Map implemented using Leaflet.js (https://leafletjs.com/)
// Map tiles provided by OpenStreetMap

function getDocIdFromUrl() {
  const params = new URL(window.location.href).searchParams;
  let returnValue = params.get("docID");
  console.log(returnValue);
  if (returnValue == null) {
    return null;
  } else {
    return returnValue;
  }
}

async function findMapMarker(docID) {
  try {
    const eventRef = doc(db, "events", docID);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      return null;
    }

    const event = eventSnap.data();
    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function findUserData(userId) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return [];
    }

    const userData = userSnap.data();
    const plannerRef = userData.planner || [];
    return plannerRef;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Wait for page to load
document.addEventListener("DOMContentLoaded", async () => {
  // Create the map (centered on Vancouver)
  const map = L.map("map").setView([49.2827, -123.1207], 11);
  let currentUser = null;

  // Add map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  let itinData = null;
  const docID = getDocIdFromUrl();

  if (docID !== null) {
    const eventData = await findMapMarker(docID);

    if (eventData !== null) {
      console.log(eventData.lat, eventData.lng);
      L.marker([eventData.lat, eventData.lng]).addTo(map);
      map.setView([eventData.lat, eventData.lng], 14);
    }
  } else {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser = user.uid;
        let plannerRef = await findUserData(currentUser);
        let len = plannerRef.length;

        for (let i = 0; i < len; i++) {
          console.log(plannerRef[i]);
          itinData = await findMapMarker(plannerRef[i]);

          if (itinData !== null) {
            console.log(itinData);
L.marker([itinData.lat, itinData.lng])
  .addTo(map)
  .bindPopup(itinData.name);          }
        }
      }
    });
  }
});