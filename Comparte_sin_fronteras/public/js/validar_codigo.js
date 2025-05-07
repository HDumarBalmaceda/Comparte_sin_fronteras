function mostrarCambio() {
    console.log("Mostrando formulario de cambio de contraseña");
    document.getElementById("formCodigo").style.display = "none";
    document.getElementById("formCambio").style.display = "block";
}

// Validar que el codigo ingresado 
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("formCodigoForm");
   
    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        let codigo = document.getElementById("codigo")?.value || "";
        console.log("Código ingresado:", codigo); // <-- Para verificar el valor


        // Muestra las alertas segun lo que devuelva el back
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
                }).then(() =>{
                    document.getElementById("formCodigo").style.display = "block";
                    document.getElementById("formCambio").style.display = "none";
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
