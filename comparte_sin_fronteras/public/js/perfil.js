
console.log('validando');

document.addEventListener("DOMContentLoaded", function () {
    fetch('/comparte_sin_fronteras/app/controladores/obtener_usuario.php', {
        method: 'GET',
        credentials: 'include' // Permite que se envíen cookies y sesiones en la petición
    })
    .then(response => {
        console.log("Estado de la respuesta:", response.status); // Muestra el código de estado (401, 403, etc.)
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data); // Muestra los datos exactos que devuelve la API

        if (data.error) {
            console.error("Error en la API:", data.error);
            return;
        }

        // Obtener los datos del usuario
        let usuario = data.data;

        // Función para reemplazar valores null por un mensaje adecuado
        function verificarDato(valor, mensajePredeterminado) {
            return valor !== null && valor !== "" ? valor : mensajePredeterminado;
        }

        // Asignar los valores a los elementos HTML
        document.getElementById("nombreUsuario").textContent = verificarDato(usuario.nombre, "Nombre no disponible") 
        document.getElementById("emailUsuario").textContent = verificarDato(usuario.email, "Email no disponible");
        document.getElementById("telefonoUsuario").textContent = verificarDato(usuario.telefono, "telefono no registrado");
        document.getElementById("ciudadUsuario").textContent = verificarDato(usuario.ciudad, "ciudad no registrada");
        document.getElementById("descripcionUsuario").textContent = verificarDato(usuario.descripcion, "Sin descripción");

        // Verificar la foto de perfil
        let fotoPerfil = verificarDato(usuario.foto_perfil, "perfil.PNG");
        document.getElementById("fotoPerfil").src = "/comparte_sin_fronteras/imagenes/" + fotoPerfil;
    })
    .catch(error => console.error("Error al obtener los datos:", error));
});

