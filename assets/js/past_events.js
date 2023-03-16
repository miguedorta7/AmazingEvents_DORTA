
import data from "./amazing.js";
import { drawCards, pastEvents,crearCheckBoxes  } from "./functions_export.js";


const elementPasados= document.getElementById("elementos-pasados")

drawCards(pastEvents(data),elementPasados)
 
crearCheckBoxes(data.events)


const input= document.getElementById('inputBuscador')
const contenedorCheck = document.getElementById('barra-opciones')

input.addEventListener("input",()=>{
  window.event.preventDefault()
  elementPasados.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(pastEvents(data),input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,elementPasados)
})

contenedorCheck.addEventListener("change",()=>{
  window.event.preventDefault()
  elementPasados.innerHTML='';
  let filtradoPornombre = filtrarPorTexto(pastEvents(data),input.value)
  let filtradoPorCategoria = filterByCategories(filtradoPornombre)
  drawCards(filtradoPorCategoria,elementPasados)
})


function filtrarPorTexto(array,texto) {
 let filterArray = array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
 return filterArray
}


function filterByCategories(array){
  const checkedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
  return checkedValues.length > 0 ? array.filter(e => checkedValues.includes(e.category)) : array;
}




