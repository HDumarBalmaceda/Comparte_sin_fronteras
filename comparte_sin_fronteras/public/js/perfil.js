// funcion para que se obtengan los datos de la base 
/*
console.log('validando');
document.addEventListener("DOMContentLoaded", function () {
    fetch('/comparte_sin_fronteras/app/controladores/obtener_usuario.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        document.getElementById("nombreUsuario").textContent = data.nombre + " " + (data.apellido ?? "");
        document.getElementById("emailUsuario").textContent = data.email;
        document.getElementById("telefonoUsuario").textContent = data.telefono ?? "No registrado";
        document.getElementById("direccionUsuario").textContent = data.direccion ?? "No registrada";
        document.getElementById("descripcionUsuario").textContent = data.descripcion ?? "Sin descripción";

        if (data.foto_perfil) {
            document.getElementById("fotoPerfil").src = "/comparte_sin_fronteras/uploads/" + data.foto_perfil;
        } else {
            document.getElementById("fotoPerfil").src = "/comparte_sin_fronteras/assets/default_profile.png";
        }
    })
    .catch(error => console.error("Error al obtener los datos:", error));
});*/
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
        document.getElementById("nombreUsuario").textContent = verificarDato(usuario.nombre, "Nombre no disponible") + 
                                                               " " + verificarDato(usuario.apellido, "");

        document.getElementById("emailUsuario").textContent = verificarDato(usuario.email, "Email no disponible");
        document.getElementById("telefonoUsuario").textContent = verificarDato(usuario.telefono, "telefono no registrado");
        document.getElementById("ubicacionUsuario").textContent = verificarDato(usuario.direccion, "Ubicacion no registrada");
        document.getElementById("descripcionUsuario").textContent = verificarDato(usuario.descripcion, "Sin descripción");

        // Verificar la foto de perfil
        let fotoPerfil = verificarDato(usuario.foto_perfil, "perfil.PNG");
        document.getElementById("fotoPerfil").src = "/comparte_sin_fronteras/imagenes/" + fotoPerfil;
    })
    .catch(error => console.error("Error al obtener los datos:", error));
});