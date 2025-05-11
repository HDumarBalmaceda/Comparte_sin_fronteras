document.getElementById('btnEliminarCuenta').addEventListener('click', function(event) {
    event.preventDefault(); // Evita recarga de la página

    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
        fetch('/comparte_sin_fronteras/app/controladores/eliminar_perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accion: "eliminar"}) // Enviar datos para confirmar la acción
        })
        .then(response => response.text())  // Capturar respuesta como texto
        .then(data => {
            console.log("Respuesta del servidor:", data); // Ver en consola qué devuelve PHP
            try {
                let jsonData = JSON.parse(data);
                if (jsonData.success) {
                    alert(jsonData.success);
                    window.location.href = '/comparte_sin_fronteras/index.html';
                } else {
                    alert(jsonData.error);
                }
            } catch (error) {
                console.error("Error interpretando JSON:", error);
                alert("Error inesperado en el servidor.");
            }
        })
        .catch(error => {
            console.error("Error eliminando cuenta:", error);
            alert("Hubo un error al intentar eliminar tu cuenta.");
        }); // <-- El `.catch()` ahora está en la posición correcta
    }
});
