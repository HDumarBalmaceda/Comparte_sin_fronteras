document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("formCodigoForm");
    console.log("formCodigo encontrado:", form); // <-- Agrega esto para ver qué devuelve

    if (!form) {
        console.error("El formulario con id 'formCodigo' no existe en el DOM.");
        return;
    }

    if (!(form instanceof HTMLFormElement)) {
        console.error("Error: 'formCodigo' no es un formulario válido.");
        console.log("Tipo de elemento obtenido:", form?.nodeName); // <-- Muestra qué tipo de elemento es
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        let codigo = document.getElementById("codigo")?.value || "";
        console.log("Código ingresado:", codigo); // <-- Para verificar el valor

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
    });
});
