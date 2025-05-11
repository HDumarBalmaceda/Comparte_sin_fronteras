console.log('cargando');
document.addEventListener('DOMContentLoaded', () => {
    const selectCategorias = document.getElementById('filtro-categoria');
  
    // Cargar las categorías en el <select>
    fetch('/comparte_sin_fronteras/app/controladores/filtrar_categorias.php')
      .then(response => response.json())
      .then(categorias => {
        categorias.forEach(cat => {
          const option = document.createElement('option');
          option.value = cat.id;
          option.textContent = cat.nombre;
          selectCategorias.appendChild(option);
        });
      });
  
    // Escuchar cambio en el <select> y cargar publicaciones filtradas
    selectCategorias.addEventListener('change', function () {
      const categoriaSeleccionada = this.value;
      cargarPublicaciones(categoriaSeleccionada); // Esta función viene del otro archivo
    });
  });