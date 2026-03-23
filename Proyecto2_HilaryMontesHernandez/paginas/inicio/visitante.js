const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
let data = JSON.parse(localStorage.getItem("dataJSON"));



// Validación de usuario
if(!usuario){
    window.location.href = "../../index.html";
}

const foto = document.getElementById("fotoPerfil");

if(usuario.foto){
    foto.src = usuario.foto;
}

function irAInicio(){
    window.location.href = "../inicio/inicio.html";
}

function irAPerfil(){
    window.location.href = "../perfil/perfil.html";
}

function cargarContenido(){
    const data = JSON.parse(localStorage.getItem("dataJSON"));
    const contenedor = document.getElementById("contenido");

    if(!data || data.length === 0){
        contenedor.innerHTML = "<p>No hay álbumes disponibles</p>";
        return;
    }

    contenedor.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${item.imagen}" alt="album">
            <div class="card-content">
                <h3>${item.nombre}</h3>
                <h4>${item.fecha}</h4>
                <p>${item.descripcion}</p>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

cargarContenido();
