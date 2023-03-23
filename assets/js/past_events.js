import { drawCards, pastEvents, crearCheckBoxes } from "./functions_export.js";

//Esta función nos permite traer de una Url todos los datos json.
function datosDeApiJson() {
  fetch("/assets/data/amazing.json")
    .then((response) => response.json())
    .then((datosEvent) => {
      const elementPasados = document.getElementById("elementos-pasados");

      //Drawcards pinta las cards correspondientes a past events
      drawCards(pastEvents(datosEvent), elementPasados);

      //Se crean los checkboxes en la pagina Past Events
      crearCheckBoxes(datosEvent.events);

      const input = document.getElementById("inputBuscador");
      const contenedorCheck = document.getElementById("barra-opciones");

      //este evento escucha lo que ingresamos en la barra del search
      input.addEventListener("input", () => {
        window.event.preventDefault();
        elementPasados.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(
          pastEvents(datosEvent),
          input.value
        );
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, elementPasados);
      });

      //este evento escucha si existe algun cambio en los checksboxes
      contenedorCheck.addEventListener("change", () => {
        window.event.preventDefault();
        elementPasados.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(
          pastEvents(datosEvent),
          input.value
        );
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, elementPasados);
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

    //.catch nos permite detener todo lo que se ejecuta en caso de haber un error en el momento de la ejecucion.
    .catch((error) => console.error(error));
}

datosDeApiJson();
