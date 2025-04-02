// funcion para mostrar alerta al actualizar la informacion del perfil 
console.log("Cargando js");

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente

    let formData = new FormData(this); // Captura los datos del formulario

    fetch('/comparte_sin_fronteras/app/controladores/actualizar_perfil.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Convertir la respuesta a JSON directamente
    .then(data => {
        console.log("Respuesta del servidor:", data); // Mostrar la respuesta en consola

        if (data.status === "success") {
            Swal.fire({
                title: "Actualización exitosa",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            }).then(()=>{
                  window.location.href ="/comparte_sin_fronteras/app/vistas/perfil.html"
            });
         
        } else {
            Swal.fire({
                title: "Error al actualizar el perfil",
                text: data.message || "Intenta de nuevo",
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


// funcion para vr la imagen previa antes de enviarla al backend 
document.getElementById('foto').addEventListener('change', function(event) {
    let reader = new FileReader();
    reader.onload = function() {
        let preview = document.getElementById('preview');
        preview.src = reader.result;
        preview.classList.remove('d-none');
    };
    reader.readAsDataURL(event.target.files[0]);
});
