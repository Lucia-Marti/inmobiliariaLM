// url de json con propiedades 
const URLJSON =  "../js/propiedades.json"

// renderizar todas las propiedades 

$(document).ready( function() {

    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
            let propiedades = respuesta.inmbuebles;

            //creo las cards iterando el json

            for (const dato of propiedades) {
                $("#prop").append(` 
     
                    <div class="card">
                        <img style="height:14rem" src= ${dato.img} >
                        <div class="card-body" >
                            <h5 class="card-title">${dato.titulo} </h5>
                            <p class="card-text"><i class="fas fa-map-marker-alt"> ${dato.ubi} </i></p>
                            <p class="card-text">
                                <i class="fas fa-home"></i> ${dato.formato} 
                                <i class="fas fa-bed"></i> ${dato.ambientes} 
                                <i class="fas fa-toilet"></i> ${dato.banios} 
                                ${dato.aceptaMascotas ?  '<i class="fas fa-paw"></i>': '<i class="fas fa-times"> No Pets</i>'}
                                
                            </p>
                            <p class="card-text">
                            $ ${dato.precioAlquiler} 
                            </p>

                            <div class="links">
                            <a href="#" class="btnVer btn btn-outline-secondary">Ver</a>
                            <button class="fav btn btn-outline-secondary"> <i class="fas fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
  
                `)                  
            } 
            
            // AGERGAR A FAVORITOS (agrego a session storage - luego en la pag de mi cuenta los obtengo del storage)
            
            let favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
            const btnFav = document.getElementsByClassName('fav')
            

            let botonesFavs= []
            botonesFavs.push(btnFav[0], btnFav[1],btnFav[2],btnFav[3],btnFav[4],btnFav[5],btnFav[6],btnFav[7],btnFav[8],btnFav[9],btnFav[10],btnFav[11])

            botonesFavs.forEach(element => {   

                element.addEventListener('click', function() {
                    // get index on click 
                    let index = $(botonesFavs).index(this)
                    // agregar index element al array y al local storage
                    btnFav[index].innerText='Agregado a favoritos!'; btnFav[index].disabled=true;
                    favoritos.push(propiedades[index]);
                    //filtrar para que no se repitan 
                    for (let i = 0; i < favoritos.length; i++) {
                        for (let k = i + 1; k < favoritos.length; k++) {
                            if (favoritos[i].id == favoritos[k].id) {
                              favoritos.splice(k,1)
                            }
                        }
                    }
                    localStorage.setItem('Favoritos', JSON.stringify(favoritos))
                })
            }); 

            // AGREGAR VISTOS RECIENTES A MI CUENTA

            let recientes = JSON.parse(sessionStorage.getItem('recientes')) || [];
            const btnVer = document.getElementsByClassName('btnVer')

            
            
            //agrego todos los botones a un array para poder iterarlos
            let botonesVer= []
            botonesVer.push(btnVer[0], btnVer[1],btnVer[2],btnVer[3],btnVer[4],btnVer[5],btnVer[6],btnVer[7],btnVer[8],btnVer[9],btnVer[10],btnVer[11])

            botonesVer.forEach(element => {   

                element.addEventListener('click', function() {
                    // get index on click 
                    let indexVer = $(botonesVer).index(this)
                    // agregar index element al array y al session storage                   
                    recientes.push(propiedades[indexVer]); 
                    //filtrar para que no se repitan 
                    for (let i = 0; i < recientes.length; i++) {
                        for (let k = i + 1; k < recientes.length; k++) {
                            if (recientes[i].id == recientes[k].id) {
                              recientes.splice(k,1)
                            }
                        }
                    }
                    //maximo 3 visitos recientes
                    if (recientes.length > 3){
                        recientes = recientes.slice(1,4)
                        sessionStorage.setItem('recientes', JSON.stringify(recientes)) 
                    }
                    sessionStorage.setItem('recientes', JSON.stringify(recientes)) 

                })
            }); 
        }
    });
})

// creo funcion para renderizar filtradas 

function propsFiltradas(array) {
   
    for (const dato of array) {
        $("#seccionFiltrado").append(` 
            <div class="card">
                <img style="height:14rem" src= ${dato.img} >
                <div class="card-body" >
                    <h5 class="card-title">${dato.titulo} </h5>
                    <p class="card-text"><i class="fas fa-map-marker-alt"> ${dato.ubi} </i></p>
                    <p class="card-text">
                        <i class="fas fa-home"></i> ${dato.formato} 
                        <i class="fas fa-bed"></i> ${dato.ambientes} 
                        <i class="fas fa-toilet"></i> ${dato.banios} 
                        ${dato.aceptaMascotas ?  '<i class="fas fa-paw"></i>': '<i class="fas fa-times"> No Pets</i>'}
                        
                    </p>
                    <p class="card-text"> $ ${dato.precioAlquiler}</p>
                    <div class="links">
                    <a href="#" class="btn btn-outline-secondary">Ver</a>
                    </div>
                </div>
            </div>
        `)                  
    } 
}   

//Seccion de filtrado ----------- 

let boxFiltro = document.getElementsByClassName('boxFiltro')

//selecciones de checkbox para que no se pueda seleccionar todo junto
boxFiltro[0].addEventListener('click', function() { boxFiltro[1].checked  = false })
boxFiltro[1].addEventListener('click', function() { boxFiltro[0].checked  = false })
boxFiltro[2].addEventListener('click', function() { boxFiltro[3].checked  = false })
boxFiltro[3].addEventListener('click', function() { boxFiltro[2].checked  = false })
// si selecciono boxes bloqueo demas filtros
$("#cheks").change(()=>{$("#listas *").prop('disabled', true)})

//solo seleccion de ambientes - disabled los demas filtros
$("#ambientes").change(()=>{
    if ($("#ambientes option:selected").val()!=0) {
        $("#area").prop('disabled', true)
        $("#precio").prop('disabled', true)
        $(".boxFiltro").prop('disabled', true)
    } else {
        $("#area").prop('disabled', false)
        $("#precio").prop('disabled', false)
        $(".boxFiltro").prop('disabled', false)
    }
})
//solo seleccion de areas - disabled los demas filtros
$("#area").change(()=>{
    if ($("#area option:selected").val()!=0) {
        $("#ambientes").prop('disabled', true)
        $("#precio").prop('disabled', true)
        $(".boxFiltro").prop('disabled', true)
    } else {
        $("#ambientes").prop('disabled', false)
        $("#precio").prop('disabled', false)
        $(".boxFiltro").prop('disabled', false)
    }
})
//solo busqueda por precio - disabled los demas filtros
$("#precio").change(()=>{
    if ($("#precio").val() >=1){
        console.log($("#precio").val());
        $("#ambientes").prop('disabled', true)
        $("#area").prop('disabled', true)
        $(".boxFiltro").prop('disabled', true)
    }else {
        $("#ambientes").prop('disabled', false)
        $("#area").prop('disabled', false)
        $(".boxFiltro").prop('disabled', false)
    }
})

//filtros on click ----------
$.getJSON(URLJSON, function(respuesta) {
    
    $("#btn1").click(() => {       

        let propiedades = respuesta.inmbuebles;
        $("#prop").hide() 
        $("#seccionFiltrado").empty()
        $("#btn1").attr("disabled", true);
        

        // if filtro de casas = mostrar casas
        if (boxFiltro[0].checked ) { 
             
            $("#todas").text("Propiedades : Casas")
            const xFormato = propiedades.filter(uni => uni.formato === "Casa")
            propsFiltradas(xFormato)

        } 
    
        // if filtro de deptos = mostrar deptos
        if (boxFiltro[1].checked ) { 
            $("#todas").text("Propiedades : Departamentos")
            const xFormato = propiedades.filter(uni => uni.formato === "Depto")
            propsFiltradas(xFormato);
        }

        // filtro todo en alquiler
        if (boxFiltro[2].checked){ 
            $("#todas").text("Propiedades en alquiler")
            const xModalidad = propiedades.filter(uni => uni.modo == "Alquiler")
            propsFiltradas(xModalidad);
        }
        // filtro todo en venta
        if (boxFiltro[3].checked == true){  
            $("#todas").text("Propiedades en venta")
            const xModalidad = propiedades.filter(uni => uni.modo == "Venta")
            propsFiltradas(xModalidad);
        }
         //filtro casas en venta
        if (boxFiltro[0].checked && boxFiltro[3].checked){ 
            $("#seccionFiltrado").empty()
            $("#todas").text("Casas en venta")
            let venta = propiedades.filter(uni => uni.modo === "Venta")
            let casaVenta = venta.filter((uni => uni.formato === "Casa"))
            propsFiltradas(casaVenta);    
        }
        // filtro casas en alquiler
        if (boxFiltro[0].checked == true && boxFiltro[2].checked == true){ 
            $("#seccionFiltrado").empty()
            $("#todas").text("Casas en alquiler")
            let alqui = propiedades.filter(uni => uni.modo === "Alquiler")
            let casaAlqui = alqui.filter((uni => uni.formato === "Casa"))
            propsFiltradas(casaAlqui);  
        }
        //filtro DEPTOS en venta
        if (boxFiltro[1].checked && boxFiltro[3].checked){ 
            $("#seccionFiltrado").empty()
            $("#todas").text("Departamentos en venta")
            let venta = propiedades.filter(uni => uni.modo === "Venta")
            let deptoVenta = venta.filter((uni => uni.formato === "Depto"))
            propsFiltradas(deptoVenta);    
        }
        // filtro DEPTOS en alquiler
        if (boxFiltro[1].checked == true && boxFiltro[2].checked == true){ 
            $("#seccionFiltrado").empty()
            $("#todas").text("Departamentos en alquiler")
            let alqui = propiedades.filter(uni => uni.modo === "Alquiler")
            let deptoAlqui = alqui.filter((uni => uni.formato === "Depto"))
            propsFiltradas(deptoAlqui);  
        }
        // filtro x precio maximo
        if ($("#precio").val() >= 1) { 
            $("#todas").text(`Propiedades menor a $${$("#precio").val()}` )
            $("#btn1").attr("disabled", true)
            let precioMaximo = $("#precio").val() 
            const xPrecio = propiedades.filter(uni => uni.precioAlquiler <= precioMaximo)
            if (xPrecio.length >=1) {
                propsFiltradas(xPrecio);
            }else if ($("#precio").val() <= 0 || $("#precio").val() == ''){
                $("#todas").text(`Todas las propiedades` )
            }else {
                $("#todas").text(`No existen propiedades menor a $${$("#precio").val()}` )
            }
        }

        // filtro de area
        function filtarArea(selected) {
            switch (selected) {
                case '1':
                    $("#todas").text("Propiedades en el centro")
                    let centro = propiedades.filter(uni => uni.ubicacion === "Centro")
                    propsFiltradas(centro); 
                    break;
                case '2':
                    $("#todas").text("Propiedades en sierras chicas")
                    let sierras = propiedades.filter(uni => uni.ubicacion === "Sierras Chicas")
                    propsFiltradas(sierras); 
                    break;
                case '3':
                    $("#todas").text("Propiedades en zona sur")
                    let sur = propiedades.filter(uni => uni.ubicacion === "Zona Sur")
                    propsFiltradas(sur);
                break;
                case '4' :
                    $("#todas").text("Propiedades en zona norte")
                    let norte = propiedades.filter(uni => uni.ubicacion === "Zona Norte")
                    propsFiltradas(norte); 
                break;
            }
        }
        filtarArea($("#area option:selected").val())

        // filtrar cantidad de ambientes 
        function filtarAmbientes(selected) {
            switch (selected) {
                case '2':
                    $("#todas").text("Propiedades con ambientes = 2")
                    let dos = propiedades.filter(uni => uni.ambientes === 2)
                    propsFiltradas(dos); 
                    break;
                case '3':
                    $("#todas").text("Propiedades con ambientes = 3")
                    let tres = propiedades.filter(uni => uni.ambientes === 3)
                    propsFiltradas(tres);
                break;
                case '4' :
                    $("#todas").text("Propiedades con ambientes = 4")
                    let cuatro = propiedades.filter(uni => uni.ambientes === 4)
                    propsFiltradas(cuatro); 
                break;
                case '5' :
                    $("#todas").text("Propiedades con ambientes = 5 o más")
                    let cinco = propiedades.filter(uni => uni.ambientes >= 5)
                    propsFiltradas(cinco); 
                break;
            }
        }
        filtarAmbientes($("#ambientes option:selected").val())


        //opcion si no hay ningun filtro seleccionadao
        if (boxFiltro[0].checked == false && boxFiltro[1].checked == false && boxFiltro[2].checked == false && boxFiltro[3].checked == false && $('#precio').val() <= 0 && $("#area option:selected").val()==0 && $("#ambientes option:selected").val()==0)  { 
            $("#todas").text("Todas las propiedades")
            $("#prop").show() 
            $("#btn1").attr("disabled", true);
            $("#todasPropiedades").prepend(`<p id="noFiltro" style="text-align:center">No se ha seleccionado ningun filtro</p>`)
            $("#cheks *").prop('disabled', false)
            $("#listas *").prop('disabled', false)
            $("#area ").prop('disabled', false)
        }

        // activar boton "aplicar filtros" si se cambian los filtros
        boxFiltro[0].addEventListener('change', function() { $("#btn1").attr("disabled", false), $("#noFiltro").hide() })
        boxFiltro[1].addEventListener('change', function() { $("#btn1").attr("disabled", false), $("#noFiltro").hide() })
        boxFiltro[2].addEventListener('change', function() { $("#btn1").attr("disabled", false), $("#noFiltro").hide() })
        boxFiltro[3].addEventListener('change', function() { $("#btn1").attr("disabled", false), $("#noFiltro").hide() })
        $('#precio').on('input', function() {$("#btn1").attr("disabled", false), $("#noFiltro").hide()});
        $('#area').on('input', function() {$("#btn1").attr("disabled", false), $("#noFiltro").hide()});
        $('#ambientes').on('input', function() {$("#btn1").attr("disabled", false), $("#noFiltro").hide()});

        //crear boton para volver a ver todas
        if($('#btn4').length > 0){
            // Button exists
        } else {
            let bntVerTodas = document.createElement('button')
            bntVerTodas.setAttribute('id', 'btn4')
            bntVerTodas.innerHTML = 'Volver a todas las propiedades'
            $("#filtradas").append(bntVerTodas)
            bntVerTodas.addEventListener('click', volver)
            function volver() {
                window.location.href = 'busqueda.html'
            } 
        }     
    })       
})

// animacion en boton aplicar filtros
$("#btn1").click( ()=> {
    if (boxFiltro[0].checked == false && boxFiltro[1].checked == false && boxFiltro[2].checked == false && boxFiltro[3].checked == false && $('#precio').val() <= 0 && $("#area option:selected").val()==0 && $("#ambientes option:selected").val()==0)  {
        //no hay filtro
    } else {
        $('html, body').animate({
            scrollTop: $("#todas").offset().top
        }, 150);
    }
})




