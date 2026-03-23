const formulario = document.querySelector("#formIniciarSesion");

//obtine los a los usuarios guardados en el localStorage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    //Obtine los datos del formulario de iniciar sesion
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    //Busca al usuario que coicide con el correo y contraseña
    const usuarioEncontrado = usuarios.find((u) => 
    u.correo === datos.correo && 
    u.contraseña === datos.contra
    );

    if(usuarioEncontrado){

        alert("Inicio de sesión correcto");

        //guarda al usuario encontrado en el localStorage
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

        //Dependiendo de su rol como visitante o administrador lo manda
        //  a la pagina correspondiente
        if(usuarioEncontrado.rol === "admin"){
            window.location.href = "paginas/administrador/administrador.html";
        } else {
            window.location.href = "paginas/inicio/inicio.html";
        }

    } else {
        alert("Usuario no encontrado");
    }
});

function irARegistro(){
    window.location.href = "../paginas/registro/registro.html";
}

function observador(){
    const usuario = localStorage.getItem("usuarioActivo");

    if(usuario){
        window.location.href = "paginas/inicio/inicio.html";
    }
}