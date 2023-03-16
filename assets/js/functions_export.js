//Función que recorre los eventos pasados
function pastEvents(myData){
  let arrayPasados = [];
  arrayPasados = myData.events.filter(myEvent => Date.parse(myEvent.date) < Date.parse(myData.currentDate));
  return arrayPasados;
};

//Función que recorre los eventos futuros
function futureEvents(myData){
  let arrayFuturos = [];
  arrayFuturos = myData.events.filter(myEvent => Date.parse(myEvent.date) > Date.parse(myData.currentDate));
  return arrayFuturos;
};

//Función que dibuja las Cards
 function drawCards(events, elements,ruta ='./') {
   if (events.length == 0) {
    elements.innerHTML= `<h2 style=color:white>There are no matches in your search</h2>`
    return
  } 
  const fragment = document.createDocumentFragment();
  events.forEach((event) => {
    const div = document.createElement("div");
    div.innerHTML = ` <div class="card mx-2 my-2">
      <img src="${event.image}" class="card-img-top" style="width: 18.5rem !important;  alt="${event.category}">
      <div class="card-body text-center">
      <h5 class="card-title">${event.name}</h5>
      <p class="card-text">${event.description}</p>
      <div class="d-flex justify-content-between">
      <p class="pt-2">Price: $${event.price}</p>
      <a href="${ruta}details.html?id=${event._id}"" class="btn btn-danger">See More</a>
      </div>
      </div>
      </div>`;
    fragment.appendChild(div);      
  })
  elements.appendChild(fragment);
} 


const contenedorCheck = document.getElementById("barra-opciones")


//Función que crea los checkboxes
function crearCheckBoxes(array){
    let arraycategory = array.map(element => element.category)
    let setCategory = new Set(arraycategory)
    let arrayChecks = Array.from(setCategory)
    let checkboxes = ''
    arrayChecks.forEach(category => {
        checkboxes += ` 
        <div class="form-check form-check-inline check-options">
          <input class="form-check-input radio-circles " type="checkbox"
            name="inlineRadioOptions" id="inlineCheckbox1" value="${category}">
          <label class="form-check-label" for="inlineCheckbox1">${category}</label>
        </div>`
    })
    contenedorCheck.innerHTML = checkboxes
}



function detailsCards(event, container) {
  let div = document.createElement('div');
  div.classList = "row g-1 div-card-details"
  div.innerHTML=`
  <div class="col-md-6 div-img-details">
    <img src="${event.image}" class="img-fluid rounded-start
      img-details" alt="...">
  </div>
  <div class="col-md-6">
    <div class="card-body card-body-datails">
      <h5 class="card-title ">Data</h5>
      <ul class="ul-details">
        <li>Name: ${event.name}</li>
        <li>Date: ${event.date}</li>
        <li>Description: ${event.description}</li>
        <li>Category: ${event.category}</li>
        <li>Place: ${event.place}</li>
        <li>Capacity:  ${event.capacity}</li>
        <li>Assistance or estimate:  ${event.assistance}</li>
        <li>Price: ${event.price}</li>
      </ul>
      <div class="d-flex justify-content-end">
                <a href="../index.html" class="btn btn-details align-self-center go bg-success">Back to Home</a>
            </div>
    </div>`;
  return container.appendChild(div)
}



export {pastEvents, futureEvents, drawCards, detailsCards, crearCheckBoxes};

