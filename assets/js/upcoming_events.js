
import data from "./amazing.js";
import {drawCards, futureEvents, crearCheckBoxes} from "./functions_export.js";

let  elementFuturos= document.getElementById("elementos-upcoming")

drawCards(futureEvents(data), elementFuturos)

crearCheckBoxes(data.events)


const input= document.getElementById('inputBuscador')
const contenedorCheck = document.getElementById('barra-opciones')

input.addEventListener("input",()=>{
  window.event.preventDefault()
  elementFuturos.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(futureEvents(data),input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,elementFuturos)
})

contenedorCheck.addEventListener("change",()=>{
  window.event.preventDefault()
  elementFuturos.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(futureEvents(data),input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,elementFuturos)
})


function filtrarPorTexto(array,texto) {
 let filterArray = array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
 return filterArray
}


function filterByCategories(array){
  const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
  return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}

