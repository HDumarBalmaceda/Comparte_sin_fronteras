
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("id");

    console.log("ID del usuario capturado desde la URL:", usuarioId); // Verificación

    if (!usuarioId) {
        console.error("No se encontró el ID del usuario en la URL.");
        return;
    }

    fetch(`/comparte_sin_fronteras/app/controladores/mostrar_perfiles.php?id=${usuarioId}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Datos del usuario obtenidos:", data);

        if (!data || data.error) {
            console.error("Error al cargar los datos:", data.error || "Datos no válidos");
            return;
        }

        // Asignar los valores al perfil del usuario de la publicación
        document.getElementById("nombreUsuario").textContent = data.nombre || "Nombre no disponible";
        document.getElementById("emailUsuario").textContent = data.email || "Email no disponible";
        document.getElementById("telefonoUsuario").textContent = data.telefono || "Teléfono no registrado";
        document.getElementById("ciudadUsuario").textContent = data.ciudad || "Ciudad no registrada";
        document.getElementById("descripcionUsuario").textContent = data.descripcion || "Sin descripción";

        const fotoPerfil = data.foto_perfil 
            ? `/comparte_sin_fronteras/imagenes/${data.foto_perfil}` 
            : "/comparte_sin_fronteras/imagenes/perfil.PNG";

        document.getElementById("fotoPerfil").src = fotoPerfil;
    })
    .catch(error => console.error("Error al obtener los datos:", error));
}); 

