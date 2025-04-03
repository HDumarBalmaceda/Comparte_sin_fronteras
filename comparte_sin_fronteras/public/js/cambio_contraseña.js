document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cambio-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let form = new FormData(this);

        fetch("/comparte_sin_fronteras/app/controladores/cambiar_contraseña.php", {
            method: "POST",
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "¡Contraseña actualizada!",
                    text: "Tu contraseña ha sido cambiada con éxito. Serás redirigido al inicio de sesión.",
                    timer: 3000, // 3 segundos antes de redirigir
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "/comparte_sin_fronteras/index.html"; // Redirección a inicio de sesión
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
});
