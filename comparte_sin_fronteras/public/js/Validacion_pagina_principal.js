//Funcion para identificar si el usuario ha iniciado sesion
document.addEventListener("DOMContentLoaded",function () {
// Hace una llamada al archiivo php
console.log("VALIDANDO");
fetch('/comparte_sin_fronteras/app/controladores/principal_controlador.php')
   .then(response => response.json())

   .then(data => {
      if (data.status !== "success"){
          window.location.href = "/comparte_sin_fronteras/Index.html";
      }
   })
   .catch(error => console.error("Error al verificar el inicio de sesion:",error));
})

