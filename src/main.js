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
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit quam vitae eros sollicitudin, eget ornare ipsum dignissim. Donec id tortor et leo mollis tincidunt ut at arcu. Nullam consectetur.",
    previmage: "./images/hike1.jpg"
}
// objectName.propertyName e.g. person.firstName

function showEvents() {
    let shownEvent = ""
    shownEvent += `<div class="m-2">`
    shownEvent += `<div class="flex gap-2 p-1"> <div> <h1 class="text-semibold text-lg"> ${sampleEvent.name} </h1> <h2 class="text-semibold text-base"> ${sampleEvent.type} </h2> <h2 class="text-semibold text-base"> ${sampleEvent.date} </h2> <p>${sampleEvent.desc}</p> </div> <img src=${sampleEvent.previmage}  class="w-1/2 rounded-lg" alt="EventImg"> </div> <div class="flex justify-between"> <button class="bg-blue-800 text-white rounded-full p-1"> Read More </button> <button class="bg-blue-800 text-white rounded-full p-1"> See on Map </button> </div>`
    shownEvent += `</div>`

    $("#eventHolder").append(shownEvent)
}