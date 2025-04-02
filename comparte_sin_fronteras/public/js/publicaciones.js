console.log('Cargando publicaciones.js...');

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fotoInput = document.getElementById("foto");
    const previewImage = document.getElementById("preview");
    const categoriaDropdown = document.getElementById("categoriaDropdown");
    const categoriaInput = document.getElementById("categoria");

    // Función para mostrar la vista previa de la imagen
    fotoInput.addEventListener("change", function (event) {
        const file = fotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                previewImage.src = reader.result;
                previewImage.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejo de selección de categoría
    document.querySelectorAll(".dropdown-menu .dropdown-item").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            let categoriaSeleccionada = this.textContent;
            let categoriaValor = this.getAttribute("data-value");

            categoriaDropdown.textContent = categoriaSeleccionada;
            categoriaInput.value = categoriaValor;
        });
    });

    // Manejo del envío del formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío automático

        let titulo = document.getElementById("titulo").value.trim();
        let categoria = categoriaInput.value.trim();
        let descripcion = document.getElementById("descripcion").value.trim();
        let foto = fotoInput.files[0];

        // Validación de campos
        if (!titulo || !categoria || !descripcion || !foto) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Todos los campos son obligatorios, incluyendo la imagen.",
            });
            return;
        }

        // Crear objeto FormData
        let formData = new FormData(form);
        formData.append("foto", foto);

        fetch("/comparte_sin_fronteras/app/controladores/publicaciones_controlador.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json().catch(() => ({ status: "error", message: "Respuesta no válida" }))) // Manejo de errores si no es JSON
        .then(data => {
            console.log("Respuesta del servidor:", data);
            if (data.status === "success") {
                Swal.fire({
                    title: "Publicación subida con éxito",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    form.reset();
                    previewImage.src = "";
                    previewImage.classList.add("d-none");
                });
            } else {
                Swal.fire({
                    title: "Error al subir publicación",
                    text: data.message || "Ocurrió un problema",
                    icon: "error"
                });
            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al procesar la solicitud",
                icon: "error"
            });
        });
    });
});
