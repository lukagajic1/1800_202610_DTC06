import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function addEventData() {
  const eventsRef = collection(db, "events");
  console.log("Adding Vancouver event data.");

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Australia vs UEFA Playoff Winner",
    type: "Sports",
    date: "2026-06-13T21:00:00",
    descShort:
      "Opening Vancouver World Cup match at BC Place featuring Australia against the UEFA playoff winner in Group D.",
    previmage: "/images/hike1.jpg",
    descLong:
      "Kick off Vancouver’s FIFA World Cup 2026 hosting with an exciting Group D matchup at BC Place. This match brings international football energy to the city and gives fans the chance to experience one of the biggest sporting events in the world right here in Vancouver.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Canada vs Qatar",
    type: "Sports",
    date: "2026-06-18T15:00:00",
    descShort:
      "Watch Canada take on Qatar in a major Group B showdown at BC Place in Vancouver.",
    previmage: "/images/hike1.jpg",
    descLong:
      "One of the most anticipated Vancouver matches of the tournament, this Group B game features Canada on home soil at BC Place. Fans can expect a high-energy atmosphere, national pride, and a memorable downtown Vancouver event experience.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: New Zealand vs Egypt",
    type: "Sports",
    date: "2026-06-21T18:00:00",
    descShort:
      "Group G action comes to Vancouver as New Zealand faces Egypt at BC Place.",
    previmage: "/images/hike1.jpg",
    descLong:
      "This Group G fixture brings two international teams to Vancouver for an evening match at BC Place. It is a great option for football fans looking to attend a competitive World Cup group-stage game in the heart of the city.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Switzerland vs Canada",
    type: "Sports",
    date: "2026-06-24T12:00:00",
    descShort:
      "Canada returns to BC Place for a lunchtime Group B match against Switzerland.",
    previmage: "/images/hike1.jpg",
    descLong:
      "Canada’s second Vancouver appearance at the World Cup sees them face Switzerland in Group B. Hosted at BC Place, this midday match is expected to draw strong local support and create one of the most exciting sports atmospheres in Vancouver in 2026.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Group G Match",
    type: "Sports",
    date: "2026-06-26T20:00:00",
    descShort:
      "A late-evening Group G match at BC Place with participating teams to be confirmed.",
    previmage: "/images/hike1.jpg",
    descLong:
      "This final Vancouver group-stage match will feature Group G teams at BC Place. Even before final team confirmation, this event is part of Vancouver’s official FIFA World Cup 2026 hosting schedule and will bring another major tournament night to the city.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Round of 32 Match",
    type: "Sports",
    date: "2026-07-02T20:00:00",
    descShort:
      "Knockout soccer arrives in Vancouver with a Round of 32 match at BC Place.",
    previmage: "/images/hike1.jpg",
    descLong:
      "The World Cup knockout stage comes to Vancouver with a Round of 32 match at BC Place. As teams fight to stay alive in the tournament, this event is expected to deliver one of the most intense and memorable matchday experiences in the city.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "FIFA World Cup 2026: Round of 16 Match",
    type: "Sports",
    date: "2026-07-07T13:00:00",
    descShort:
      "A Round of 16 knockout match takes place at BC Place in Vancouver.",
    previmage: "/images/hike1.jpg",
    descLong:
      "Vancouver’s final FIFA World Cup 2026 match is a Round of 16 showdown at BC Place. With a place in the quarterfinals on the line, this knockout game is expected to bring a huge crowd and one of the most exciting football atmospheres the city will see during the tournament.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "Vancouver International Jazz Festival (Opening Weekend)",
    type: "Music",
    date: "2026-06-20T18:00:00",
    descShort:
      "Live jazz performances kick off across Vancouver with outdoor and ticketed shows.",
    previmage: "/images/hike1.jpg",
    descLong:
      "The Vancouver International Jazz Festival begins with performances across downtown and surrounding neighborhoods. Expect a mix of free outdoor concerts and ticketed shows featuring local and international artists.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "Khatsahlano Street Party",
    type: "Festival",
    date: "2026-06-27T12:00:00",
    descShort:
      "Massive street festival on West 4th with live music, food vendors, and local shops.",
    previmage: "/images/hike2.jpg",
    descLong:
      "Khatsahlano Street Party is one of Vancouver’s largest free music and arts festivals. West 4th Avenue is transformed into a lively street filled with multiple music stages, food vendors, and local businesses.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "Shipyards Night Market",
    type: "Food",
    date: "2026-06-26T17:00:00",
    descShort:
      "Evening market in North Vancouver with food trucks, live music, and waterfront views.",
    previmage: "/images/hike3.jpg",
    descLong:
      "The Shipyards Night Market offers a mix of food trucks, craft vendors, and live entertainment. Located in North Vancouver, it’s a great place to enjoy summer evenings with views of the city skyline.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "Outdoor Movie Night at Stanley Park",
    type: "Entertainment",
    date: "2026-07-03T21:30:00",
    descShort:
      "Watch a movie under the stars in Stanley Park with friends and family.",
    previmage: "/images/hike1.jpg",
    descLong:
      "Enjoy a summer outdoor movie experience in Stanley Park. Bring blankets, snacks, and friends for a relaxed evening watching a popular film in one of Vancouver’s most iconic parks.",
    last_updated: serverTimestamp(),
  });

  addDoc(eventsRef, {
    name: "Canada Day Celebrations at Canada Place",
    type: "Festival",
    date: "2026-07-01T15:00:00",
    descShort:
      "Celebrate Canada Day with live performances, food, and waterfront festivities.",
    previmage: "/images/hike2.jpg",
    descLong:
      "Canada Day at Canada Place features live music, cultural performances, food vendors, and activities throughout the day. It’s one of the biggest national celebrations in Vancouver with stunning waterfront views.",
    last_updated: serverTimestamp(),
  });
}

async function seedEvents() {
  const eventsRef = collection(db, "events");

  const querySnapshot = await getDocs(eventsRef);

  if (querySnapshot.empty) {
    console.log("Events collection is empty. Seeding data.");

    addEventData();
  } else {
    console.log("Event collection already contains data. Skipping seed.");
  }
}

seedEvents();

async function displayCardsDynamically() {
  const eventsCollectionRef = collection(db, "events");

  try {
    const querySnapshot = await getDocs(eventsCollectionRef);
    querySnapshot.forEach((doc) => {
      let newEvent = doc.data();
      let result_html = "";
      result_html += ``;
      result_html += `
      <div class="shrink-0 mb-6 border-slate-200 border-2 rounded-2xl w-80 h-96 bg-gray-100 overflow-hidden mx-auto">
          <img src="${newEvent.previmage}" class="w-full h-1/2 object-cover" alt="${newEvent.name}"/>
          <div class="px-3">
            <h1 class="text-center m-1 pt-1 text-lg font-semibold">
            ${newEvent.name} 
          </h1>
          <p class="pb-2">${newEvent.descShort}</p>
          <div class="flex justify-between">
            <button class="bg-[#00C7A9] rounded-full px-2 py-1 text-white font-semibold">
              <a href="eventGeneric.html?docID=${doc.id}">
                <p class="">Read More</p>
              </a>
            
          </button>
          <button class="bg-[#00C7A9] rounded-full px-2 py-1 text-white font-semibold">
            <a href="map.html?docID=${doc.id}">
                <p class="">View on Map</p>
              </a>
          </button>
          </div>
          
          </div>
        </div>
        
      
    `;

      let result_div = "";
      result_div = document.getElementById("eventHolder");
      let x = document.createElement(`div`);
      x.innerHTML = result_html;
      result_div.appendChild(x);
    });
  } catch (error) {
    console.error("Error getting documents:", error);
  }
}

displayCardsDynamically();

// ADDed NAME UPDATE TO HOME PAGE CARD
function showName() {
  const nameElement = document.getElementById("name-goes-here"); // the <h1> element to display "Hello, {name}"

  // Wait for Firebase to determine the current authentication state.
  // onAuthReady() runs the callback once Firebase finishes checking the signed-in user.
  // The user's name is extracted from the Firebase Authentication object
  // You can "go to console" to check out current users.

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("LOGGED IN as:", user.uid, user.email);
      // e.g., show authed UI
    } else {
      console.log("NOT logged in");
      // e.g., show guest UI
    }

    const name = user.displayName || user.email;

    if (nameElement) {
      nameElement.textContent = name;
    }
  });
}

showName();
// ENDS HERE
