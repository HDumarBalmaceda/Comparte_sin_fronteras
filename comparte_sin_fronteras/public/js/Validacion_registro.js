
// Funcion para que aparesca una una ventana emergente cuando el registro se 
// Realizo de manera exitosa 

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente

fetch('/comparte_sin_fronteras/app/controladores/registro_controlador.php', {
    method: 'POST',
    body: new FormData(this)
})
.then(response => response.text()) // <-- CAMBIA ESTO A .text() PARA VER LA RESPUESTA CRUDA
.then(data => {
    console.log("Respuesta del servidor:", data); // <-- IMPRIME LA RESPUESTA EN LA CONSOLA
    return JSON.parse(data); // <-- Intenta convertir a JSON
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
            window.location.href = "/comparte_sin_fronteras/Index.html"; // Redirige al usuario
        });
    } else {
        Swal.fire({
            title: "Error",
            text: data.message,
            icon: "error"
        });
    }
}) }
.catch(error => console.error("Error en la petición:", error));*/

