import data from "./amazing.js";

let cardsIndex = [];

function allEvents(events) {
  for (let event of events) {
    cardsIndex.push(event);
  }
  return cardsIndex;
}

allEvents(data.events, data.currentDate);

const element = document.getElementById("elementos-index");
const fragment = document.createDocumentFragment();
cardsIndex.forEach((event) => {
  const div = document.createElement("div");
  div.innerHTML = ` <div class="card mx-2 my-2">
    <img src="${event.image}" class="card-img-top" style="width: 18.5rem !important;  alt="${event.category}">
    <div class="card-body text-center">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between">
    <p class="pt-2">Price: $${event.price}</p>
    <a href="../pages/details.html" class="btn btn-danger">See More</a>
    </div>
    </div>
    </div>`;
  fragment.appendChild(div);
});

element.appendChild(fragment);


//Mostrar las diferentes categorías
const formCategories = document.getElementsByClassName('formCategories')[0];
let fragmentForm = document.createDocumentFragment();
let prevCategory;
for (let event of data.events) {
    if (event.category !== prevCategory) {
        let div = document.createElement('div');
        div.classList="d-flex flex-wrap";
        div.innerHTML=`
        <label class="d-inline-flex my-2 mx-5">
        <input class="form-check-input me-3" name="category1" type="checkbox">${event.category}
        </label>`;
        fragmentForm.appendChild(div);
    }
prevCategory = event.category;
}
let categories = formCategories.appendChild(fragmentForm);

