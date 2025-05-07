console.log('Cargando js mostrar publicaciones');

// Función para cargar todas las publicaciones desde el servidor
function mostrarPublicaciones() {
    fetch("/comparte_sin_fronteras/app/controladores/mostrar_publicaciones.php")
        .then(response => response.json()) // Convierte la respuesta JSON en un objeto
        .then(data => {
            console.log("Publicaciones recibidas:", data); // Verifica los datos en la consola
            const contenedor = document.getElementById('contenedor-publicaciones');
            contenedor.innerHTML = ''; // Limpiar contenido previo

            // Si no hay publicaciones, mostrar mensaje de aviso
            if (data.length === 0) {
                contenedor.innerHTML = '<p class="text-center">No hay publicaciones disponibles por ahora.</p>';
                return;
            }

            // Crear una tarjeta para cada publicación
            data.forEach(pub => {
                const card = document.createElement('div'); // Se crea un div para cada publicación
                card.className = 'col';

                // Definir el color del badge dependiendo del estado
                const estadoBadgeClass = pub.estado === 'disponible' ? 'bg-success' : 'bg-danger';

                // Se llena el contenido de la tarjeta con la información de la publicación
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
                contenedor.appendChild(card); // Agregar la tarjeta al contenedor
            });
        })
        .catch(error => console.error('Error al cargar las publicaciones:', error));
}

// Función para filtrar publicaciones por categoría
function cargarPublicaciones(categoria) {
    fetch(`/comparte_sin_fronteras/app/controladores/filtrar_publicaciones.php?categoria_id=${categoria}`)
        .then(response => response.json()) // Convierte la respuesta JSON en un objeto
        .then(data => {
            const contenedor = document.getElementById('contenedor-publicaciones');
            contenedor.innerHTML = ''; // Limpiar contenido previo

            // Si no hay publicaciones filtradas, mostrar mensaje de aviso
            if (data.length === 0) {
                contenedor.innerHTML = '<p class="text-center">No hay publicaciones disponibles.</p>';
                return;
            }

            // Crear una tarjeta para cada publicación filtrada
            data.forEach(pub => {
                const card = document.createElement('div');
                card.className = 'col';

                const estadoBadgeClass = pub.estado === 'disponible' ? 'bg-success' : 'bg-danger';

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
                            Publicado por ${pub.nombre_usuario} el ${new Date(pub.fecha_publicacion).toLocaleDateString()}
                        </div>
                    </div>
                `;
                contenedor.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar las publicaciones filtradas:', error));
}

// Llamar la función inicial para mostrar todas las publicaciones cuando se carga la página
mostrarPublicaciones();
