//boton en header buscar propiedades

$(".buscar").on("click", function(e){

    if ( !$("#inputBuscar").val() ) {
        $('form').append(`<p id="completar" style='color:white' >Por favor complete el campo </p>`)
        $("#btn1").attr("disabled", true);
        $('#inputBuscar').on('input', function() {$("#btn1").attr("disabled", false), $("#completar").hide()});
    }else {
        
        window.location.href = '../views/busqueda.html'
    }

})

// url de json con propiedades 
const URLJ =  "../js/propiedades.json"
// renderizar todas las propiedades 
$(document).ready( function() {

    $.getJSON(URLJ, function (respuesta, estado) {
        if(estado === "success"){
            let propiedades = respuesta.inmbuebles;
           
            // mostrar las destacadas(6)
            propiedades = propiedades.slice(0,6)

                //creo las cards iterando el json
                for (const dato of propiedades) {
                    $("#props").append(` 
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


            // AGREGAR A FAVORITOS (agrego a local storage - luego en la pag de mi cuenta los obtengo del storage)
            let favoritos = JSON.parse(localStorage.getItem('Favoritos')) || [];
            const btnFav = document.getElementsByClassName('fav')

            let botonesFavs= []
            botonesFavs.push(btnFav[0], btnFav[1],btnFav[2],btnFav[3],btnFav[4],btnFav[5])

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

            let botonesVer= []
            botonesVer.push(btnVer[0], btnVer[1],btnVer[2],btnVer[3],btnVer[4],btnVer[5])

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

//animacion de logo en pagina de inico unicamente
$("#logo").on("click", function() {
    $("#logo").animate({
                        opacity:'0.5',
                        height:'150px',
                        width:'200px'  
                        },
                        "slow")
    $(".barraBuscar").fadeOut(1000)
    $(".barraBuscar").fadeIn(1000)

})
//animacion nosotros pagina 
$("#nosotros").on("click", function() {
    $('html, body').animate({
                    scrollTop: $(".titulo3").offset().top  
                    }, 100);
})


// REQ RES - ver los agentes

const URLJSON =  "js/nosotros.json"

$("#btn3").click(() => { 
    $("#btn3").hide()
    $("#aqui").append(`<h2 class="titulo3">Nuestros agentes inmboliarios</h2>`)
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
            let misDatos = respuesta.data;
            for (const dato of misDatos) {
                $("#aqui").append(` 
                    
                    <div class="col" >
                        <div class="card" style="width: 16rem;">
                            <img src=${dato.avatar} class="card-img-top" >
                        
                            <div class="card-body">
                                <p class="card-text">${dato.first_name} ${dato.last_name} </p>
                                <p class="card-text">${dato.email}</p>
                            </div>
                        </div>
                    
                    </div>
            
                `)                  
            }  
        }
    });
});

// BANNER AYUDA - POST EMAIL PARA SUBSCRIPCION
const URLPOST   = "https://jsonplaceholder.typicode.com/posts"

//control de datos input required
$("#btn4").on('click', recibirCorreo)
function recibirCorreo(e) {

    e.preventDefault()

    //Info a enviar
    const infoPost =  { email: $("#email").val()}

    function validar_email( email ) {
        email = $("#email").val()
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }
    
    
    if (validar_email()==false) {
        alert('Ingrese una dirección de email válida')
    }else {
        $(".parrafoAyuda").hide()
        $("#subscripcion").hide()
        $(".seccionAyuda").html(`Gracias por subscribirse a nuestro foro! Estaremos en contacto`)
    

        // Ajax metodo post
        $.post(URLPOST, infoPost ,(info, estado) => {
                if(estado === "success"){
                    $(".seccionAyuda").append(`<div style="margin:50px">
                    <h6 >Subscriptores en futuro servidor</h6>
                    <p>Email : ${info.email}</p>  
                    </div>`);
                }  
        });
    }
}








