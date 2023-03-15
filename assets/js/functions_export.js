function pastEvents(myData){
  let arrayPasados = [];
  arrayPasados = myData.events.filter(myEvent => Date.parse(myEvent.date) < Date.parse(myData.currentDate));
  return arrayPasados;
};

function futureEvents(myData){
  let arrayFuturos = [];
  arrayFuturos = myData.events.filter(myEvent => Date.parse(myEvent.date) > Date.parse(myData.currentDate));
  return arrayFuturos;
};


function drawCards(arr, elements) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    let card = document.createElement("div");
    card.classList.add("col");
    card.style.width = "25rem";
    card.innerHTML =  ` <div class="card mx-2 my-2">
<img src="${arr[i].image}" class="card-img-top" style="width: 18.5rem !important;  alt="${arr[i].category}">
<div class="card-body text-center">
    <h5 class="card-title">${arr[i].name}</h5>
    <p class="card-text">${arr[i].description}</p>
    <div class="d-flex justify-content-between">
        <p class="pt-2">Price: $${arr[i].price}</p>
        <a href="../pages/details.html" class="btn btn-danger">See More</a>
    </div>
</div>
</div>`;
    fragment.appendChild(card);      
  }
  elements.appendChild(fragment);
}




/* 
//Mostrar las diferentes categorías
const formCategories = document.getElementsByClassName('formSearch');
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



export {pastEvents, futureEvents, drawCards}; */