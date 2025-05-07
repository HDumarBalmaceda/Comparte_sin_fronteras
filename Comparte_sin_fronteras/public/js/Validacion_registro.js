// Función para mostrar alerta cuando el registro se realiza con éxito
console.log("Archivo JS cargado correctamente");
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente

    fetch('/comparte_sin_fronteras/app/controladores/registro_controlador.php', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.text()) // Obtener la respuesta como texto
    .then(text => {
        console.log("Respuesta del servidor:", text); // Mostrar la respuesta en consola

        try {
            return JSON.parse(text); // Intentar convertir a JSON
        } catch (error) {
            throw new Error("La respuesta no es un JSON válido: " + text);
        }
    })
    .then(data => {
        if (data.status === "success") {
            Swal.fire({
                title: "¡Registro exitoso!",
                text: "Serás dirigido a la página de inicio de sesión",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "/comparte_sin_fronteras/Index.html"; // Redirigir al usuario
            });
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
            text: "Ocurrió un problema al procesar la solicitud",
            icon: "error"
        });
    });
});
