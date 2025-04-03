console.log('Cargando.js');

// funcion para que se muestren los formularios
function mostrarCodigo() {
    document.getElementById("formEmail").style.display = "none";
    document.getElementById("formCodigo").style.display = "block";
}

function mostrarCambio() {
    document.getElementById("formCodigo").style.display = "none";
    document.getElementById("formCambio").style.display = "block";
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
                    mostrarCodigo(); // Llamamos la función para mostrar el formulario correcto
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message,
                    confirmButtonText: "Intentar de nuevo"
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
/*
    // Captura el evento de envío del formulario de código de verificación
    document.getElementById("formCodigo").addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        let form = document.getElementById("formCodigo"); // Asegura que seleccionas el formulario correcto
        let codigo = document.getElementById("codigo").value;


        fetch("/comparte_sin_fronteras/app/controladores/verificar_codigo.php", {
            method: "POST",
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Validación exitosa",
                    text: data.message,
                }).then(() => {
                    mostrarCambio(); // Llamamos la función para mostrar el siguiente formulario
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Código incorrecto",
                    text: data.message,
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
    });*/
});
