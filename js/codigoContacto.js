const input = document.getElementsByTagName('input')
const btnEnviar = document.getElementById('btn1')

const URLPOST   = "https://jsonplaceholder.typicode.com/posts"

//control de datos input required
btnEnviar.addEventListener('click', recibirForm)
function recibirForm(e) {

    e.preventDefault()

    //Info a enviar
    const infoPost =  { nombre: input[0].value, email: input[1].value, tel: input[2].value, mensaje: $("#mensaje").val()}

    function validar_email( email ) {
        email = input[1].value
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }
    
    if ((input[0].value == '')  || (validar_email() == false) || (input[2].value == ''))  {
        alert('Complete todos los campos correctamente')
    }else {
        let form = document.getElementsByTagName('form')
        form[0].style.display = 'none'
        let mensaje = document.createElement('h4')
        mensaje.innerHTML = `Mensaje enviado! Gracias ${input[0].value}, en breve nos contactaremos con usted.`
        let div = document.getElementsByClassName('formContacto')
        div[0].appendChild(mensaje)

        // Ajax metodo post
        $.post(URLPOST, infoPost ,(info, estado) => {
                if(estado === "success"){
                    $("main").append(`<div style="margin:50px">
                    <h4 >Base de clientes en futuro servidor</h4>
                    <p>Nombre : ${info.nombre}</p>
                    <p>Email : ${info.email}</p>
                    <p>Telefono : ${info.tel}</p>
                    <p>Mensaje : ${info.mensaje}</p>  
                    </div>`);
                }  
        });
    }
}







