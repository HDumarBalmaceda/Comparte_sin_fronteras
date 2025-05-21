<?php
// Incluir el archivo de conexión a la base de datos
include_once __DIR__ . '/../../conexion/Conexion_db.php';

// Crear una instancia de la conexión a la base de datos
$database = new Conexion();
$conn = $database->conn;

// Consulta SQL para obtener todas las categorías ordenadas alfabéticamente
$sql = "SELECT id, nombre FROM categorias ORDER BY nombre ASC";
$resultado = $conn->query($sql);

// Inicializar un array para almacenar las categorías obtenidas de la base de datos
$categorias = [];

// Recorrer los resultados de la consulta y almacenarlos en el array
while ($fila = $resultado->fetch_assoc()) {
    $categorias[] = $fila; // Agregar cada fila (categoría) al array
}

// Especificar que la respuesta será en formato JSON
header('Content-Type: application/json');

// Convertir el array de categorías a formato JSON y enviarlo como respuesta
echo json_encode($categorias);

// Cerrar la conexión con la base de datos
$conn->close();
?>
