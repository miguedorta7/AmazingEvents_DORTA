import { crearCheckBoxes, drawCards } from "./functions_export.js";

//Esta función nos permite traer de una Url todos los datos json.
function datosDeApiJson() {
  fetch("/assets/data/amazing.json")
    .then((response) => response.json())
    .then((datosEvent) => {
      const element = document.getElementById("elementos-index");
      let ruta = "./pages/";
      
      //Se crean los checkboxes en la pagina Home
      crearCheckBoxes(datosEvent.events);
      
      //Drawcards pinta todas las cards en Home.
      drawCards(datosEvent.events, element, ruta);
     
      //Se llama al Search y a los checkboxes
      const input = document.getElementById("inputBuscador");
      const contenedorCheck = document.getElementById("barra-opciones");

      //Se llama al evento input y se filtra por texto y por categorias en el Search.
      input.addEventListener("input", () => {
        window.event.preventDefault();
        element.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(datosEvent.events, input.value);
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, element, ruta);
      });
      
      //este evento escucha si existe algun cambio en los checks.
      contenedorCheck.addEventListener("change", () => {
        window.event.preventDefault();
        element.innerHTML = "";
        let filtradoPornombre = filtrarPorTexto(datosEvent.events, input.value);
        let filtradoPorCategoria = filterByCategories(filtradoPornombre);
        drawCards(filtradoPorCategoria, element, ruta);
      });

      //Esta función permite buscar el texto ingresado en el input y compararlo con los datos de array de las tarjetas.
      function filtrarPorTexto(array, texto) {
        let filterArray = array.filter((element) =>
          element.name.toLowerCase().includes(texto.toLowerCase())
        );
        return filterArray;
      }
      //Esta función permite buscar por categorias seleccionadas y compararlas con las de las tarjetas.
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
