const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const foto = document.getElementById("fotoPerfil");
const inputFile = document.getElementById("nuevaFoto");
const nombreArchivo = document.getElementById("nombreArchivo");

if(inputFile){
    inputFile.addEventListener("change", function(){
        if(inputFile.files.length > 0){
            nombreArchivo.textContent = inputFile.files[0].name;
        } else {
            nombreArchivo.textContent = "Ningún archivo seleccionado";
        }
    });
}

if(usuario && usuario.foto){
    foto.src = usuario.foto;
}

if(!usuario){
    window.location.href = "../../index.html";
}

document.getElementById("fotoPerfil").src = usuario.foto;

const form = document.getElementById("formPerfil");

form.nombre.value = usuario.nombre;
form.apellido.value = usuario.apellido;
form.correo.value = usuario.correo;
form.contraseña.value = usuario.contraseña;
form.rol.value = usuario.rol;

// guarda los cambios
form.addEventListener("submit", function(e){
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form).entries());

    const inputFoto = document.getElementById("nuevaFoto");
    const archivo = inputFoto.files[0];

    function guardar(foto){

        // actualiza los cambios al usuario 
        let usuarioActualizado = {
            ...usuario,
            ...datos
        };

        if(foto){
            usuarioActualizado.foto = foto;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

        // actualiza la lista de usuarios del localStorage
        for(let i = 0; i < usuarios.length; i++){
            if(usuarios[i].correo === usuario.correo){
                usuarios[i] = usuarioActualizado;
            }
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Perfil actualizado");

        if(usuarioActualizado.rol === "admin"){
            window.location.href = "../administrador/administrador.html";
        } else {
            window.location.href = "../inicio/inicio.html";
        }
    }

    // aculaliza si hay camio de foto en el perfil
    if(archivo){
        const reader = new FileReader();

        reader.onload = function(){
            guardar(reader.result);
        };

        reader.readAsDataURL(archivo);
    } else {
        guardar();
    }
});

function cerrarSesion(){
    localStorage.removeItem("usuarioActivo");
    window.location.href = "../../index.html";
}
function irAInicio(){
    window.location.href = "../inicio/inicio.html";
}

function irAPerfil(){
    window.location.href = "../perfil/perfil.html";
}