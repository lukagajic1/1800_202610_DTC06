import { db } from "./firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";


function getDocIdFromUrl(){
    const params = new URL(window.location.href).searchParams
    let returnValue = params.get("docID")
    console.log(returnValue)
    return returnValue
}


async function displayEventInfo() {
    const id = getDocIdFromUrl();

    try {
        const eventRef = doc(db, "events", id)
        const eventSnap = await getDoc(eventRef)

        const event = eventSnap.data()
        const name = event.name
        const previmage = event.previmage

        //updates page
        document.getElementById("eventName").textContent = name
        const img = document.getElementById("eventImage")
        img.src = previmage
    }
    catch (error){
        console.error("Error loading event", error)
        document.getElementById("eventName").textContent = "Error loading event"

    }
}

displayEventInfo()