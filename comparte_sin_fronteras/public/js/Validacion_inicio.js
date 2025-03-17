// Funcion para que se valide cuando se inicio sesion de manera que si es incorrecto se da un mensaje de error
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    fetch('/comparte_sin_fronteras/app/controladores/inicio_controlador.php', { // Ajusta la ruta si es necesario
        method: 'POST',
        body: new FormData(this) // Envia los datos del formulario
    })
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
        if (data.status === "success") {
            window.location.href = "/comparte_sin_fronteras/app/vistas/pagina_principal.html";
        } else {
            Swal.fire({
                title: "Error",
                text: data.message,
                icon: "error"
            });
        }
    })
    .catch(error => {
        console.error("Error en la petición:", error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema con la conexión al servidor.",
            icon: "error"
        });
    });
});
   
