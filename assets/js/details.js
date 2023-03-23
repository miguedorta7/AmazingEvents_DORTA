//import data from "./amazing.js";
import { detailsCards } from "./functions_export.js";

//Esta función nos permite traer de una Url todos los datos json.
function datosDeApiJson() {
  fetch("/assets/data/amazing.json")
    .then((response) => response.json())
    .then((datosEvent) => {
      // URLSearchParams permite capturar el id de cada tarjeta para luego compararlo con los eventos del array que trae Json y presentar el
      //resultado con todos los detalles en details.html
      const queryString = location.search;
      const param = new URLSearchParams(queryString);
      const eventId = param.get("id");
      const event = datosEvent.events.find((event) => event._id == eventId);
      let detailsContainer = document.getElementById("datailsCard");

      detailsCards(event, detailsContainer);
    })

      //.catch nos permite detener todo lo que se ejecuta en caso de haber un error en el momento de la ejecucion.
    .catch((error) => console.error(error));
}

datosDeApiJson();
