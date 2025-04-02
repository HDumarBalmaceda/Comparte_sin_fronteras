
 // funciona para que se carguen las categorias en el formulario de publicaciones
console.log('Cargando categorias'); 
document.addEventListener("DOMContentLoaded", function() {
    fetch("/comparte_sin_fronteras/app/controladores/obtener_categorias.php") // Llamamos al PHP que obtiene las categorías
        .then(response => response.json())
        .then(data => {
            let lista = document.getElementById("categoriaLista");
            data.forEach(categoria => {
                let item = document.createElement("li");
                item.innerHTML = `<a class="dropdown-item" href="#" data-value="${categoria.id}">${categoria.nombre}</a>`;
                item.addEventListener("click", function() {
                    document.getElementById("categoriaDropdown").textContent = categoria.nombre;
                    document.getElementById("categoria").value = categoria.id;
                });
                lista.appendChild(item);
            });
        })
        .catch(error => console.error("Error cargando categorías:", error));
    });
