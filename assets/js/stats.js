const mayorAsistencia = document.getElementById("eventHighest");
const menorAsistencia = document.getElementById("eventLowest");
const mayorCapacidad = document.getElementById("eventLarger");
const tablaUP = document.getElementById("upcomingEventsStatsByCategories");
const tablaPast = document.getElementById("pastEventsStatsByCategories");

//Esta función nos permite traer de una Url todos los datos json.
function datosDeApiJson() {
  fetch("/assets/data/amazing.json")
    .then((response) => response.json())
    .then((datosEvent) => {
      let eventos = datosEvent.events;

      //variable que filtra los eventos
      const eventosFiltrados = datosEvent.events.filter(
        (event) => event.date < datosEvent.currentDate
      );

      //Variable que filtra los eventos futuros
      const eventosFiltradosUpcoming = datosEvent.events.filter(
        (event) => event.date > datosEvent.currentDate
      );

      //Funcion que obtiene los eventos con menor porcentaje de asistencia.
      function resultadosEventos() {
        let resultado = eventos.sort((a, b) => {
          let evento1 =
            ((a.assistance ? a.assistance : a.estimate) / a.capacity) * 100;
          let evento2 =
            ((b.assistance ? b.assistance : b.estimate) / b.capacity) * 100;
          if (evento1 < evento2) {
            return -1;
          }
          if (evento1 > evento2) {
            return 1;
          }
        });
        return resultado;
      }

      //Variable que obtiene los resultados de mayor capacidad
      const resultadoMayorCapacidad = datosEvent.events
        .sort((evento1, evento2) => evento1.capacity - evento2.capacity)
        .slice(-1);
      //Variable que obtiene los eventos de menor asistencia
      const eventoMenorAsistencia = resultadosEventos()[0];
      console.log(eventoMenorAsistencia);
      //Variable que obtiene los eventos de mayor asistencia
      const eventoMayorAsistencia =
        resultadosEventos()[resultadosEventos().length - 1];
      console.log(eventoMayorAsistencia);
      asistencia(eventoMayorAsistencia, mayorAsistencia);
      asistencia(eventoMenorAsistencia, menorAsistencia);
      asistencia(resultadoMayorCapacidad[0], mayorCapacidad);

      //Función que obtiene los eventos de mayor y menor asistencia
      function asistencia(objeto, elemento) {
        elemento.innerHTML = objeto.name;
      }

      //UPCOMING EVENTS

      //En la variable "categorias" se almacenan los filtros de las ganancias totales y % total de asistencia de los eventos Futuros
      const categorias = {};
      eventosFiltradosUpcoming.forEach((propiedadEventos) => {
        if (!categorias[propiedadEventos.category]) {
          categorias[propiedadEventos.category] = {
            price: 0,
            estimate: 0,
            capacity: 0,
          };
        }
        //
        categorias[propiedadEventos.category].price +=
          propiedadEventos.price * propiedadEventos.estimate;
        categorias[propiedadEventos.category].capacity +=
          propiedadEventos.capacity;
        categorias[propiedadEventos.category].estimate +=
          propiedadEventos.estimate;
      });

      let subirTabla = "";
      for (const categoria in categorias) {
        const precio = categorias[categoria].price;
        const estimados = categorias[categoria].estimate;
        const capacidad = categorias[categoria].capacity;
        let valorPorcentaje = ((estimados * 100) / capacidad).toFixed(2);
        let template = () => {
          return `<tr>
					<td colspan="2" class="bg-light">${categoria}</td>
					<td colspan="2" class="bg-light">${precio}</td>
					<td colspan="2" class="bg-light">${valorPorcentaje} %</td>
				</tr>`;
        };
        subirTabla += template();
      }
      //Se insertan los datos en la tabla de Upcoming Events
      tablaUP.innerHTML = subirTabla;

      //PAST EVENTS

      //En la variable "categorias2" se almacenan los filtros de las ganancias totales y % total de asistencia de los eventos pasados
      const categorias2 = {};
      eventosFiltrados.forEach((propiedadEventos) => {
        if (!categorias2[propiedadEventos.category]) {
          categorias2[propiedadEventos.category] = {
            price: 0,
            assistance: 0,
            capacity: 0,
          };
        }
        categorias2[propiedadEventos.category].price +=
          propiedadEventos.price * propiedadEventos.assistance;
        categorias2[propiedadEventos.category].capacity +=
          propiedadEventos.capacity;
        categorias2[propiedadEventos.category].assistance +=
          propiedadEventos.assistance;
      });
      let subirTabla2 = "";
      for (const categoria in categorias2) {
        const precio2 = categorias2[categoria].price;
        const asistencias2 = categorias2[categoria].assistance;
        const capacidad2 = categorias2[categoria].capacity;
        let valorPorcentaje2 = ((asistencias2 * 100) / capacidad2).toFixed(1);
        let template2 = () => {
          return `<tr>
					<td colspan="2" class="bg-light">${categoria}</td>
					<td colspan="2" class="bg-light">${precio2}</td>
					<td colspan="2" class="bg-light">${valorPorcentaje2} %</td>
				</tr>`;
        };
        subirTabla2 += template2();
      }
      //Se insertan los datos en la tabla de Past Events
      tablaPast.innerHTML = subirTabla2;
    })
    .catch((error) => console.error(error));
}
datosDeApiJson();
