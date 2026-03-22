import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  uploadBytes
} from "firebase/firestore";

function uploadEvent(){
    const eventsRef = collection(db, "events");
    const eventTitle = document.getElementById("title").value
    const eventTime = document.getElementById("time").value
    const eventType = document.getElementById("type").value
    const eventDesc = document.getElementById("description").value
    const eventImg = document.getElementById("prevImg").value
    addDoc(eventsRef, {
        name: eventTitle,
        date: eventTime,
        descLong: eventDesc,
        descShort: eventDesc,
        type: eventType,
        last_updated: serverTimestamp(),
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById("uploadBtn")
    uploadBtn.addEventListener('click', uploadEvent)
})