const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const inputFile = document.getElementById("imagenAlbum");
const nombreArchivo = document.getElementById("nombreArchivo");

//Muestra el nombre del archivo que se va a subir
inputFile.addEventListener("change", function(){
    if(inputFile.files.length > 0){
        nombreArchivo.textContent = inputFile.files[0].name;
    } else {
        nombreArchivo.textContent = "";
    }
});

//Guarda la informacion de los albums en formato JSON en una constante para podeer acceder a ellos
const datosBase = [
    {
    "nombre": "2 Cool 4 Skool",
    "fecha": "2013",
    "descripcion": "Álbum debut de BTS con un estilo hip-hop fuerte y juvenil.",
    "imagen": "../../recursos/2cool4skool.jpg"
    },
    {
    "nombre": "O!RUL8,2?",
    "fecha": "2013",
    "descripcion": "Un álbum que cuestiona el sistema educativo y los sueños de los jóvenes.",
    "imagen": "../../recursos/ORUL82.jpg"
    },
    {
    "nombre": "The Most Beautiful Moment in Life, Pt. 2",
    "fecha": "2015",
    "descripcion": "Parte de una serie icónica que explora la juventud y sus emociones.",
    "imagen": "../../recursos/theMostBeautifulMomentInLife.jpg"
    },
    {
    "nombre": "Wings",
    "fecha": "2016",
    "descripcion": "Un álbum conceptual inspirado en el crecimiento personal y la tentación.",
    "imagen": "../../recursos/wings.jpg"
    },
    {
    "nombre": "Love Yourself: Her",
    "fecha": "2017",
    "descripcion": "Inicio de la trilogía Love Yourself, enfocada en el amor y la identidad.",
    "imagen": "../../recursos/LoveYourselfHer.jpg"
    },
    {
    "nombre": "Love Yourself: Tear",
    "fecha": "2018",
    "descripcion": "Un álbum más oscuro que explora la ruptura y el dolor emocional.",
    "imagen": "../../recursos/LoveYourselfTear.jpg"
    },
    {
    "nombre": "Map of the Soul: Persona",
    "fecha": "2019",
    "descripcion": "Explora la identidad y la relación entre el artista y su persona pública.",
    "imagen": "../../recursos/MapOfTheSoulPersona.jpg"
    },
    {
    "nombre": "BE",
    "fecha": "2020",
    "descripcion": "Un álbum creado durante la pandemia que transmite esperanza y conexión.",
    "imagen": "../../recursos/be.jpg"
    }
];

let data = JSON.parse(localStorage.getItem("dataJSON"));

if(!data){
    localStorage.setItem("dataJSON", JSON.stringify(datosBase));
    data = datosBase;
}

//Bloque el acceso a Visitante y le da acceso a Administrador
if(!usuario || usuario.rol !== "admin"){
    window.location.href = "../../index.html";
}

//Muestra la foto de perfil
const foto = document.getElementById("fotoPerfil");

if(usuario.foto){
    foto.src = usuario.foto;
}

function irAInicio(){
    window.location.href = "../administrador/administrador.html";
}

function irAPerfil(){
    window.location.href = "../perfil/perfil.html";
}

function cargarJSON(event){
    const archivo = event.target.files[0];

    if(!archivo){
        alert("Selecciona un archivo");
        return;
    }

    const lector = new FileReader();

    lector.onload = function(e){
        try{
            const data = JSON.parse(e.target.result);

            localStorage.setItem("dataJSON", JSON.stringify(data));

            alert("JSON cargado correctamente");

            cargarContenido(); 
        }catch(error){
            alert("Error en el JSON");
            console.log(error);
        }
    };
    lector.readAsText(archivo);
}

//Muestra los albums 
function cargarContenido(){
    const data = JSON.parse(localStorage.getItem("dataJSON"));
    const contenedor = document.getElementById("contenido");

    if(!data){
        contenedor.innerHTML = "<p>No hay álbumes</p>";
        return;
    }

    contenedor.innerHTML = "";

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <img src="${item.imagen}">
        <div class="card-content">
        <h3>${item.nombre}</h3>
        <h4> ${item.fecha}</h4>
        <p>${item.descripcion}</p>

        <button class="btn-eliminar" onclick="eliminarAlbum(${index})">Eliminar</button>
    </div>
`;
        contenedor.appendChild(div);
    });
    console.log("DATA:", data);
}
//Cuando inicia la pagina carga los albums
cargarContenido();

function agregarAlbum(){

    //Obtine los datos del formulario para subir un nuevo album
    const nombre = document.getElementById("nombreAlbum").value;
    const fecha = document.getElementById("fechaAlbum").value;
    const descripcion = document.getElementById("descripcionAlbum").value;
    const inputImagen = document.getElementById("imagenAlbum");

    const archivo = inputImagen.files[0];

    if(!nombre || !fecha || !descripcion || !archivo){
    alert("Completa todos los campos");
    return;
}
    const reader = new FileReader();

    reader.onload = function(){
    
        // Convierte la imagen en base64 para que sea mas facil de cargar
        const imagenBase64 = reader.result;

        //Obtine los datos que se ya han cargado
        let data = JSON.parse(localStorage.getItem("dataJSON")) || [];

        //Agrega el nuevo album
        data.push({
            nombre: nombre,
            fecha: fecha,
            descripcion: descripcion,
            imagen: imagenBase64 
        });

        //y se guarda en el localStorage
        localStorage.setItem("dataJSON", JSON.stringify(data));

        document.getElementById("nombreAlbum").value = "";
        document.getElementById("descripcionAlbum").value = "";
        document.getElementById("imagenAlbum").value = "";

        //Actualiza la vista
        cargarContenido();
    };
    reader.readAsDataURL(archivo);
}

function eliminarAlbum(index){
    let data = JSON.parse(localStorage.getItem("dataJSON"));

    data.splice(index, 1);
    localStorage.setItem("dataJSON", JSON.stringify(data));
    cargarContenido();
}
