// Funcion para mostrar  alerta de cerrar sesion 

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logoutBtn").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que la redirección ocurra de inmediato

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Tu sesión se cerrará",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText:"Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Solo redirige si el usuario confirma
                window.location.href = "/comparte_sin_fronteras/app/controladores/cerrar_sesion.php";
            }
        });
    });
});