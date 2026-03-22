import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import {uploadBytes} from "firebase/storage"

function uploadEvent(){
    // to do: grab new event id, create new collection in event called images, use uploadbytes to attempt to place images there
    const eventsRef = collection(db, "events");
    const eventTitle = document.getElementById("title").value
    const eventTime = document.getElementById("time").value
    const eventType = document.getElementById("type").value
    const eventDesc = document.getElementById("description").value
    const eventImg = document.getElementById("prevImg").value
    // this didn't work.
    // uploadBytes(eventsRef, eventImg).then((snapshot) => {
    //     console.log("hopefully this works")
    // })
    addDoc(eventsRef, {
        name: eventTitle,
        date: eventTime,
        descLong: eventDesc,
        descShort: eventDesc,
        type: eventType,
        // this didn't work either.
        // previmage:eventImg
        last_updated: serverTimestamp(),
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const uploadBtn = document.getElementById("uploadBtn")
    uploadBtn.addEventListener('click', uploadEvent)
})