console.log('Cargando');
// Espera a que el DOM esté completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', function () {
    const selectCategorias = document.getElementById('filtro-categoria');
  
    // Hace una petición al backend para obtener las categorías desde PHP
    fetch('/comparte_sin_fronteras/app/controladores/filtrar_categorias.php')
      .then(response => response.json()) // Convierte la respuesta en JSON
      .then(data => {
        // Recorre el array de categorías recibido y las agrega como opciones al <select>
        data.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria.id;           // Usa el ID de la categoría como valor
          option.textContent = categoria.nombre; // Muestra el nombre de la categoría
          selectCategorias.appendChild(option);  // Agrega la opción al select
        });
      })
      .catch(error => console.error('Error cargando categorías:', error)); // Muestra errores en consola
  });
  