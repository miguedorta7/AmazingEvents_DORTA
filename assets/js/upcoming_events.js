//import data from "./amazing.js";

import {
  drawCards,
  futureEvents,
  crearCheckBoxes,
} from "./functions_export.js";

//Esta función nos permite traer de una Url todos los datos json.
function datosDeApiJson() {
  fetch("/assets/data/amazing.json")
    .then((response) => response.json())
    .then((datosEvent) => {
      let elementFuturos = document.getElementById("elementos-upcoming");

      //Drawcards pinta las cards correspondientes a eventos futuros.
      drawCards(futureEvents(datosEvent), elementFuturos);
      //Se crean los checkboxes en la pagina Upcoming
      crearCheckBoxes(datosEvent.events);

      const input = document.getElementById("inputBuscador");
      const contenedorCheck = document.getElementById("barra-opciones");

      //este evento escucha lo que ingresamos en la barra del search
      input.addEventListener("input", () => {
        window.event.preventDefault();
        elementFuturos.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(
          futureEvents(datosEvent),
          input.value
        );
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, elementFuturos);
      });

      //este evento escucha si existe algun cambio en los checksboxes
      contenedorCheck.addEventListener("change", () => {
        window.event.preventDefault();
        elementFuturos.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(
          futureEvents(datosEvent),
          input.value
        );
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, elementFuturos);
      });

      //Esta funcion filtra por texto
      function filtrarPorTexto(array, texto) {
        let filterArray = array.filter((element) =>
          element.name.toLowerCase().includes(texto.toLowerCase())
        );
        return filterArray;
      }

       //Esta funcion filtra por categorias
      function filterByCategories(array) {
        const checkedValues = Array.from(
          document.querySelectorAll('input[type="checkbox"]:checked')
        ).map((input) => input.value);
        return checkedValues.length > 0
          ? array.filter((e) => checkedValues.includes(e.category))
          : array;
      }
    })



    
    .catch((error) => console.error(error));
}

datosDeApiJson();
