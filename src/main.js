import { db } from "./firebaseConfig.js";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

function addEventData() {
  const eventsRef = collection(db, "events")
  console.log("Adding sample event data.")
  addDoc(eventsRef, {
        name: "Placeholder Event",
        type: "Concert",
        date: "01-01-01, 3 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "./images/hike1.jpg",
        descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar.",
        last_updated: serverTimestamp()
    })
    addDoc(eventsRef, {
        name: "Placeholder Event 2",
        type: "Party",
        date: "02-02-02, 6 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "./images/hike2.jpg",
        descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar.",
        last_updated: serverTimestamp()
    })
    addDoc(eventsRef, {
        name: "Placeholder Event 3",
        type: "Fundraiser",
        date: "03-03-03, 9 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "./images/hike3.jpg",
        descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar.",
        last_updated: serverTimestamp()
    });
}

async function seedEvents() {

  const eventsRef = collection(db, "events")

  const querySnapshot = await getDocs(eventsRef)

  if (querySnapshot.empty) {
    console.log("Events collection is empty. Seeding data.")

    addEventData()
  }

  else {
    console.log("Event collection already contains data. Skipping seed.")
  }
}

seedEvents()

async function displayCardsDynamically() {
  let cardTemplate = document.getElementById("eventCardTemplate")
  const eventsCollectionRef = collection(db, "event")

  try {
    const querySnapshot = await getDocs(eventsCollectionRef)
    querySnapshot.forEach(doc =>{
      let newcard = cardTemplate.contentEditable.cloneNode(true)
      const event = doc.data()

      newcard.getElementById("#cardTitle").textContent = event.name
      newcard.getElementById("#cardTime").textContent = event.date
      newcard.getElementById("#readMore").href = `eventPage.html?docID=${doc.id}`

      newcard.getElementById("#cardImage").src = `./images/${event.previmage}.png`

      document.getElementById("eventHolder").appendChild(newcard)
    })
  }
  catch (error) {
    console.error("Error getting documents:", error)
  }
}

