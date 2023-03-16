import data from "./amazing.js";
import { crearCheckBoxes, drawCards} from "./functions_export.js";



const element = document.getElementById("elementos-index");
let ruta = "./pages/"

crearCheckBoxes(data.events)
drawCards(data.events,element,ruta)


const input= document.getElementById('inputBuscador')
const contenedorCheck = document.getElementById('barra-opciones')

input.addEventListener("input",()=>{
  window.event.preventDefault()
  element.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(data.events,input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,element, ruta)
})

contenedorCheck.addEventListener("change",()=>{
  window.event.preventDefault()
  element.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(data.events,input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,element, ruta)
})


function filtrarPorTexto(array,texto) {
 let filterArray = array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
 return filterArray
}


function filterByCategories(array){
  const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
  return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

