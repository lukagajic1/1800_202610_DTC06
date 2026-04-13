import { db, auth } from "./firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { uploadBytes } from "firebase/storage";

const GEOAPIFY_API_KEY = "73634d3116a14faea2a762935d5e2483".trim();

async function findAddress(address, postalCode) {
  try {
    const fullAddress = `${address}, ${postalCode}, Canada`;

    const url =
      `https://api.geoapify.com/v1/geocode/search` +
      `?text=${encodeURIComponent(fullAddress)}` +
      `&filter=countrycode:ca` +
      `&apiKey=${encodeURIComponent(GEOAPIFY_API_KEY)}`;

    const response = await fetch(url);
    const data = await response.json();

    // console.log("fullAddress:", fullAddress);
    // console.log("Geoapify response:", data);

    if (data.error) {
      throw new Error(
        `Geocoding failed: ${data.statusCode || ""} ${data.error} - ${data.message || ""}`,
      );
    }

    if (!data.features || !data.features.length) {
      throw new Error(
        `Geocoding failed: no results found for "${fullAddress}"`,
      );
    }

    const result = data.features[0];
    const lat = result.properties.lat;
    const lng = result.properties.lon;
    const formattedAddress = result.properties.formatted;
    const newObj = {
      result: result,
      lat: lat,
      lng: lng,
      formattedAddress: formattedAddress,
    };
    // console.log(newObj)
    return newObj;
  } catch (error) {
    console.error(error);
  }
}

// image encoding copied from tech tips
function readImageAsBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("./images/placeholder.jpg"); // default image
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      resolve(e.target.result); // full Base64 string
    };
    reader.onerror = function () {
      reject(new Error("Error reading image"));
    };
    reader.readAsDataURL(file);
  });
}

async function uploadEvent(event) {
  event.preventDefault();
  // to do: grab new event id, create new collection in event called images, use uploadbytes to attempt to place images there
  const eventsRef = collection(db, "events");
  const eventTitle = document.getElementById("title").value;
  const eventTime = document.getElementById("time").value;
  const eventType = document.getElementById("type").value;
  const eventDesc = document.getElementById("description").value;
  const eventImg = document.getElementById("prevImg").files[0];
  const eventAddress = document.getElementById("address").value;
  const eventPostalCode = document.getElementById("postalCode").value;

  const address = await findAddress(eventAddress, eventPostalCode);
  console.log(address);

  if (
    !eventTitle ||
    !eventTime ||
    !eventType ||
    !eventAddress ||
    !eventPostalCode ||
    !eventDesc
  ) {
    alert("Please fill in all fields");
    return;
  }

  if (!address) {
    alert("Could not find that address");
    return;
  }

  const encodedImage = await readImageAsBase64(eventImg);

  const docRef = await addDoc(eventsRef, {
    name: eventTitle,
    date: eventTime,
    descLong: eventDesc,
    descShort: eventDesc,
    type: eventType,
    addressData: address.result,
    address: address.formattedAddress,
    lat: address.lat,
    lng: address.lng,
    last_updated: serverTimestamp(),
    previmage: encodedImage,
  });

  // 🔥 redirect instead of alert
  window.location.href = `eventGeneric.html?docID=${docRef.id}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.addEventListener("click", uploadEvent);
});