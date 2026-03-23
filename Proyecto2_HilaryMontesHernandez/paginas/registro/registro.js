const formRegistro = document.querySelector("#formRegistro");

const foto = document.getElementById("fotoPerfil");
const inputFoto = document.getElementById("fotoInput");
const nombreArchivo = document.getElementById("nombreArchivo");

if(inputFoto){
    inputFoto.addEventListener("change", function(){
        if(inputFoto.files.length > 0){
            nombreArchivo.textContent = inputFoto.files[0].name;
        } else {
            nombreArchivo.textContent = "Ningún archivo seleccionado";
        }
    });
}

let Usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor(nombre, apellido, correo, contraseña, foto, rol){
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
        this.foto = foto;
        this.rol = rol;
    }
}

function registrarUsuario(e){
    e.preventDefault();

    const datos = new FormData(formRegistro);
    const usuario = Object.fromEntries(datos.entries());
    

    if(!usuario.nombre || !usuario.correo || !usuario.contraseña){
        alert("Completa todos los campos");
        return;
    }

    for(let i = 0; i < Usuarios.length; i++){
        if(Usuarios[i].correo === usuario.correo){
            alert("Este correo ya está registrado");
            return;
        }
    }

    const archivo = inputFoto.files[0];

    if(!archivo){
        alert("Selecciona una foto");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(){

        const fotoBase64 = reader.result;

        const usuarioNuevo = new Usuario(
            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.contraseña,
            fotoBase64,   
            usuario.rol
        );

        Usuarios.push(usuarioNuevo);
        localStorage.setItem("usuarios", JSON.stringify(Usuarios));

        alert("Registro exitoso");

        window.location.href = "../../index.html";
    };

    reader.readAsDataURL(archivo);
}

formRegistro.addEventListener("submit", registrarUsuario);
