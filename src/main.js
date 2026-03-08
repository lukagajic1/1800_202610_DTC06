import { db } from "./firebaseConfig.js";
import { collection, getDocs, addDoc, serverTimestamp, doc } from "firebase/firestore";

function addEventData() {
  const eventsRef = collection(db, "events")
  console.log("Adding sample event data.")
  addDoc(eventsRef, {
        name: "Placeholder Event",
        type: "Concert",
        date: "01-01-01, 3 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "/images/hike1.jpg",
        descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar.",
        last_updated: serverTimestamp()
    })
    addDoc(eventsRef, {
        name: "Placeholder Event 2",
        type: "Party",
        date: "02-02-02, 6 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "/images/hike2.jpg",
        descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar.",
        last_updated: serverTimestamp()
    })
    addDoc(eventsRef, {
        name: "Placeholder Event 3",
        type: "Fundraiser",
        date: "03-03-03, 9 PM",
        descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
        previmage: "/images/hike3.jpg",
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


async function displayCardsDynamically(){
  const eventsCollectionRef = collection(db, "events")

  try {
    const querySnapshot = await getDocs(eventsCollectionRef)
    querySnapshot.forEach((doc) =>{
    let newEvent = doc.data()
    let result_html = ""
    result_html += ``
    result_html += `
      <div class="p-4 shadow-2xl border-slate-200 border-2 rounded-2xl lg:w-80">
          <img class="rounded-3xl my-1" src=${newEvent.previmage} alt="eventimg"/>
          <div class="flex gap-4 mb-2">
            <div class="">
              <h3 class="font-semibold text-2xl">${newEvent.name}</h3>
              <p class="text-lg">${newEvent.descShort}</p>
            </div>
            
          </div>
          <div class="flex justify-between">
            <button class="bg-[#00649A] rounded-full p-2 text-white font-semibold">
              <a href="eventGeneric.html?docID=${doc.id}">
                <p class="">Read More</p>
              </a>
            
          </button>
          <button class="bg-[#00649A] rounded-full p-2 text-white font-semibold">
            <p class="">View on Map</p>
          </button>
          </div>
          
        </div>
      
    `

    let result_div = ""
    result_div = document.getElementById("eventHolder")
    let x = document.createElement(`div`)
    x.innerHTML = result_html
    result_div.appendChild(x)
})
}
catch (error) {
  console.error("Error getting documents:", error)
}
}

displayCardsDynamically()