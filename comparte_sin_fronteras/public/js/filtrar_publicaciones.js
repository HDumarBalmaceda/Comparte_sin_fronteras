// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el elemento del <select> para filtrar por categoría
  const filtroCategoria = document.getElementById("filtro-categoria");

  // Escucha el evento de cambio en el select (cuando el usuario selecciona una categoría)
  filtroCategoria.addEventListener("change", function () {
    // Obtiene el valor seleccionado (el ID de la categoría)
    const categoriaSeleccionada = this.value;

    // Si no se selecciona ninguna categoría, carga todas las publicaciones
    const url = categoriaSeleccionada
      ? `/comparte_sin_fronteras/app/controladores/filtrar_publicaciones.php?categoria_id=${categoriaSeleccionada}`
      : `/comparte_sin_fronteras/app/controladores/filtrar_publicaciones.php`;

    // Realiza la petición fetch para obtener las publicaciones filtradas
    fetch(url)
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => {
        const contenedor = document.getElementById("contenedor-publicaciones");
        contenedor.innerHTML = ""; // Limpia las publicaciones actuales

        // Verifica si hay publicaciones para mostrar
        if (data.length === 0) {
          contenedor.innerHTML =
            '<p class="text-center">No hay publicaciones disponibles en esta categoría.</p>';
          return;
        }

        // Itera sobre cada publicación recibida
        data.forEach((pub) => {
          const card = document.createElement("div");
          card.className = "col";

          // Define el color del badge según el estado de la publicación
          const estadoBadgeClass =
            pub.estado === "disponible" ? "bg-success" : "bg-danger";

          // Construye el contenido HTML de la tarjeta
          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <img src="${pub.imagen}" class="card-img-top" alt="${pub.titulo}">
              <div class="card-body">
                <h5 class="card-title">${pub.titulo}</h5>
                <p class="card-text">${pub.descripcion}</p>
                <span class="badge bg-primary">${pub.nombre_categoria}</span>
                <span class="badge ${estadoBadgeClass}">${pub.estado}</span>
                <button class="btn btn-primary mt-3" onclick="window.location.href='/comparte_sin_fronteras/app/vistas/perfil.html?id=${pub.usuario_id}'">
                  Ver perfil
                </button>
              </div>
              <div class="card-footer text-muted">
                Publicado por ${pub.nombre_usuario} el ${new Date(
            pub.fecha_publicacion
          ).toLocaleDateString()}
              </div>
            </div>
          `;

          // Agrega la tarjeta al contenedor principal
          contenedor.appendChild(card);
        });
      })
      // Captura y muestra errores en consola en caso de fallo en la solicitud
      .catch((error) => {
        console.error("Error al filtrar publicaciones:", error);
      });
  });
});
