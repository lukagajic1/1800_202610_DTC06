import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
// Map implemented using Leaflet.js (https://leafletjs.com/)
// Map tiles provided by OpenStreetMap

function getDocIdFromUrl() {
  const params = new URL(window.location.href).searchParams
  let returnValue = params.get("docID")
  console.log(returnValue)
  return returnValue
}

async function findMapMarker() {
  const docID = getDocIdFromUrl()
  try {
      const eventRef = doc(db, "events", docID)
      const eventSnap = await getDoc(eventRef)
  
      const event = eventSnap.data()
      return event
      
    }
  catch(error){
    console.error(error)
  }
}

// Wait for page to load
document.addEventListener("DOMContentLoaded", async () => {
  // Create the map (centered on Vancouver)
  const map = L.map("map").setView([49.2827, -123.1207], 11);

  // Add map tiles (this is the actual map)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  
  const eventData = await findMapMarker()
  console.log(eventData.lat, eventData.lng)

  L.marker([eventData.lat, eventData.lng]).addTo(map);

});
