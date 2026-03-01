// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';

// If you have custom global styles, import them as well:
// import '../styles/style.css';

// function sayHello() {

// }
// document.addEventListener('DOMContentLoaded', sayHello);


const sampleEvent = {
    name: "Placeholder Event",
    type: "Concert",
    date: "01-01-01, 3 PM",
    descShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
    previmage: "./images/hike1.jpg",
    descLong: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tempus  nisl. Integer suscipit est sed nunc accumsan consequat. Vivamus placerat massa enim, id condimentum velit dictum non. Integer nibh mi, fermentum quis aliquet gravida, feugiat quis dolor. Fusce non lacinia purus, vel  mollis nunc. Curabitur condimentum tincidunt nisl, sit amet vulputate  enim tempus at. Sed feugiat at erat a volutpat. Vivamus bibendum ut nisl dictum pulvinar."
}
// objectName.propertyName e.g. person.firstName

function showEvents() {
    let shownEvent = ""
    shownEvent += `<div class="m-2">`
    shownEvent += `<div class="flex gap-2 p-1"> <div> <h1 class="text-semibold text-lg"> ${sampleEvent.name} </h1> <h2 class="text-semibold text-base"> ${sampleEvent.type} </h2> <h2 class="font-semibold text-base"> ${sampleEvent.date} </h2> <p>${sampleEvent.descShort}</p> </div> <img src=${sampleEvent.previmage}  class="w-1/2 rounded-lg" alt="EventImg"> </div> <div class="flex justify-between"> <a href="eventGeneric.html"> <button class="bg-[#00C7A9] text-white rounded-full p-1"> Read More </button> </a> <button class="bg-[#00C7A9] text-white rounded-full p-1"> See on Map </button> </div>`
    shownEvent += `</div>`

    $("#eventHolder").append(shownEvent)
}

function eventPage() {
    let eventPage = ""
    eventPage += `<div class="m-2">`
    eventPage += `<div class="flex gap-2 p-1"> <div> <h1 class="font-semibold text-lg"> ${sampleEvent.name} </h1> <h2 class="text-semibold text-base"> ${sampleEvent.type} </h2> <h2 class="text-semibold text-base"> ${sampleEvent.date} </h2> <p>${sampleEvent.descLong}</p> </div> <img src=${sampleEvent.previmage}  class="size-64 rounded-lg" alt="EventImg"> </div> <div class="flex justify-between"> <a href="eventGeneric.html"> <button class="bg-[#00C7A9] text-white rounded-full hidden p-1"> Read More </button> </a> <button class="bg-[#00C7A9] text-white rounded-full p-1"> See on Map </button> </div>`
    eventPage += `</div>`

    $("#mainEventPage").append(eventPage)
}