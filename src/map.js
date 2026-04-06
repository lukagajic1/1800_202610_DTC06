import { db, auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// Map implemented using Leaflet.js (https://leafletjs.com/)
// Map tiles provided by OpenStreetMap

function getDocIdFromUrl() {
  const params = new URL(window.location.href).searchParams
  let returnValue = params.get("docID")
  console.log(returnValue)
  if (returnValue == null){
    return null
  }
  else{
    return returnValue
  }
  
}

async function findMapMarker(docID) {
  try {
      const eventRef = doc(db, "events", docID)
      const eventSnap = await getDoc(eventRef)
  
      const event = eventSnap.data()
      return event
      
    }
  catch(error){
    console.error(error)
    return null
  }
}

async function findUserData(userId){
  try{
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()
        const plannerRef = userData.planner
        return plannerRef
      }
      catch(error){
        console.log("oopsies", error)
      }
}



// Wait for page to load
document.addEventListener("DOMContentLoaded", async () => {
  // Create the map (centered on Vancouver)
  const map = L.map("map").setView([49.2827, -123.1207], 11);
  let currentUser = null
  
  // Add map tiles (this is the actual map)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
  
  let itinData = null
  const docID = getDocIdFromUrl()
  const eventData = await findMapMarker(docID)
  if (eventData === null){
    onAuthStateChanged(auth, async (user) => {
    currentUser = user.uid
    if (currentUser){
      let plannerRef = await findUserData(user.uid)
      let len = plannerRef.length
        for (let i = 0; i < len; i++){
          console.log(plannerRef[i])
          itinData = await findMapMarker(plannerRef[i])
          console.log(itinData)
          L.marker([itinData.lat, itinData.lng]).addTo(map);
          
        }
    }
    })
  }
  else{
    console.log(eventData.lat, eventData.lng)

    L.marker([eventData.lat, eventData.lng]).addTo(map);
  }
  

  

});
