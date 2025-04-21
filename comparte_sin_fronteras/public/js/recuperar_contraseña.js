console.log('Cargando.js recuperar contraseña');

// funcion para que se muestren los formularios
function mostrarCodigo() {
    document.getElementById("formEmail").style.display = "none";
    document.getElementById("formCodigo").style.display = "block";
}


document.addEventListener("DOMContentLoaded", function () {
    // Captura el evento de envío del formulario de email
    document.getElementById("formEmail").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita la recarga de la página

        let email = document.getElementById("email").value; // Obtiene el correo ingresado

        fetch("/comparte_sin_fronteras/app/controladores/enviar_codigo.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "email=" + encodeURIComponent(email)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Código enviado",
                    text: data.message,
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    mostrarCodigo(); // 🔹 Solo se ejecuta si el servidor confirmó que el correo existe
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message,
                    confirmButtonText: "Intentar de nuevo"
                }).then(() => {
                    // Asegurarse de que el usuario no pase al siguiente formulario
                    document.getElementById("formEmail").style.display = "block";
                    document.getElementById("formCodigo").style.display = "none";
                });
            }
        })
        
        
        .catch(error => {
            console.error("Error en la solicitud:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema con el servidor. Inténtalo más tarde.",
                confirmButtonText: "Aceptar"
            });
        });
    });

});