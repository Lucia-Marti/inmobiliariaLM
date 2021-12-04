//VISTOS RECIENTEMENTE ----------
// get recientes de session storage
let recientes= sessionStorage.getItem('recientes')
//seccion para vistos recientemente 
let containerRecientes =document.getElementById('recientes')
let recientesList = JSON.parse(recientes)  || []

// Creo fila x cada visto reciente
recientesList.forEach(element => {
   containerRecientes.innerHTML += ` 
   <table style="margin: 20px;">
   <tr>

     <th>Propiedad ${element.id}</th>
     <th>Formato</th>
     <th>Modo</th>
     <th>Ambientes</th>
     <th>Pet friendly</th>
     
   </tr>

   <tr>
   <td> <img src= ${element.img} width="150px" height="100px"> </td>
     <td>${element.formato} en ${element.modo} </td>
     <td>${element.ubicacion}</td>
     <td>${element.ambientes}</td>
     <td>${element.aceptaMascotas ? "si" : "no" }</td>
   </tr>

 </table>`
    
})


//FAVORITOS -----------

// get favoritos de local storage
let favos = localStorage.getItem('Favoritos') 

//seccion para favoritos
let containerFavs = document.getElementById('favoritos')

let favList = JSON.parse(favos) || []

favList.forEach(element => {
   containerFavs.innerHTML += ` 
    <table id=${element.id} style="margin: 10px;">
      <tr>

        <th>Propiedad ${element.id}</th>
        <th>Formato</th>
        <th>Ubicación</th>
        <th>Ambientes</th>
        <th>Pet friendly</th>
        <th><a class='basurero' style="color: #283747" href="#"><i class="fas fa-trash"></i></a></th>
        
      </tr>

      <tr>
      <td> <img src= ${element.img} width="150px" height="100px"> </td>
        <td>${element.formato} en ${element.modo}</td>
        <td>${element.ubi}</td>
        <td>${element.ambientes}</td>
        <td>${element.aceptaMascotas ? "si" : "no" }</td>
      </tr>

  </table>`   
})

// basurero on click para eliminar algun fav

$('.basurero').on('click', function() {
  // la remove visualmente
  $(this).parent().parent().parent().parent().remove()

  //tengo que remover del array favList el item sobre el que hago click 
  
  let ide = $(this).parent().parent().parent().parent().attr('id')

  function find(x) {
    let encontrada = favList.find(item => item.id === x)
    let index = favList.indexOf(encontrada)
    //elimino del array elemento con ese index
    favList.splice(index, 1)
    //reemplazo array de local storage
    localStorage.setItem('Favoritos', JSON.stringify(favList));
  }
  find(parseFloat(ide))
})