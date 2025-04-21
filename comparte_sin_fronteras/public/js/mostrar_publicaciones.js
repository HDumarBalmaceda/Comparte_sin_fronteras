console.log('Cargando js mostrar publicaciones');
// función para mostrar las publicaciones

//prueba 

fetch("/comparte_sin_fronteras/app/controladores/mostrar_publicaciones.php")
  .then(response => response.json())
  .then(data => {
    console.log("Publicaciones recibidas:", data); // Verifica los datos en la consola
  })
  .catch(error => console.error("Error al cargar las publicaciones:", error));

fetch("/comparte_sin_fronteras/app/controladores/mostrar_publicaciones.php")
  .then(response => response.json()) // convierte el json en un objeto
  .then(data => {
    const contenedor = document.getElementById('contenedor-publicaciones');

    // verifica si no hay publicaciones
    if (data.length === 0) {
      contenedor.innerHTML = '<p class="text-center">No hay publicaciones disponibles por ahora.</p>';
      return;
    }

    // crea una tarjeta con cada publicación
    data.forEach(pub => {
      const card = document.createElement('div'); // crea un div con cada publicación
      card.className = 'col';

      // Definimos el color del badge dependiendo del estado
      const estadoBadgeClass = pub.estado === 'disponible' ? 'bg-success' : 'bg-danger';

      // Se llena el contenido de la tarjeta con la información de la publicación, incluyendo el estado con color
      console.log(`Botón generado para el usuario: ${pub.usuario_id}`);
      card.innerHTML = `
       <div class="card h-100 shadow-sm">
        <img src="${pub.imagen}" class="card-img-top" alt="${pub.titulo}">
         <div class="card-body">
          <h5 class="card-title">${pub.titulo}</h5>
          <p class="card-text">${pub.descripcion}</p>
         <span class="badge bg-primary">${pub.nombre_categoria}</span>
         <span class="badge ${estadoBadgeClass}">${pub.estado}</span> <!-- Estado con color -->
          <button class="btn btn-primary mt-3" onclick="window.location.href='/comparte_sin_fronteras/app/vistas/perfil.html?id=${pub.usuario_id}'">
          Ver perfil
          </button> <!-- Botón para ver el perfil del usuario -->
         </div>
          <div class="card-footer text-muted">
           Publicado por ${pub.nombre_usuario} el ${new Date(pub.fecha_publicacion).toLocaleDateString()}
         </div>
      </div>
      `;
      contenedor.appendChild(card); // cada vez que se crea una tarjeta, se inserta en la página
    });
  })
  // maneja los errores
  .catch(error => {
    console.error('Error al cargar las publicaciones:', error);
  });