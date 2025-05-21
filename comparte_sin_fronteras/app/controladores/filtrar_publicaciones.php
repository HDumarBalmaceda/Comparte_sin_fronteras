<?php
// Incluye el archivo de conexión a la base de datos
include_once __DIR__ . '/../../conexion/Conexion_db.php';

// Crea una nueva conexión usando tu clase
$database = new Conexion();
$conn = $database->conn;

// Verifica si se recibió un parámetro GET llamado categoria_id y lo convierte a entero
$categoria_id = isset($_GET['categoria_id']) ? intval($_GET['categoria_id']) : 0;

// Consulta SQL base que trae publicaciones disponibles y sus relaciones
$sql = "SELECT p.*, c.nombre AS nombre_categoria, u.nombre AS nombre_usuario
        FROM publicaciones p
        JOIN categorias c ON p.categoria_id = c.id
        JOIN usuarios u ON p.usuario_id = u.id
        WHERE p.estado = 'disponible'";

// Si se especificó un ID de categoría, se filtra por esa categoría
if ($categoria_id > 0) {
    $sql .= " AND p.categoria_id = $categoria_id";
}

// Ordena las publicaciones más recientes primero
$sql .= " ORDER BY p.fecha_publicacion DESC";

// Ejecuta la consulta
$resultado = $conn->query($sql);

// Arreglo para guardar las publicaciones
$publicaciones = [];

// Recorre los resultados y los guarda en el arreglo
while ($fila = $resultado->fetch_assoc()) {
    // Ajusta la ruta de la imagen
    $fila['imagen'] = '/comparte_sin_fronteras/imagenes/publicaciones/' . basename($fila['imagen']);
    $publicaciones[] = $fila;
}

// Indica que se devuelve contenido JSON
header('Content-Type: application/json');

// Devuelve el arreglo de publicaciones en formato JSON
echo json_encode($publicaciones);

// Cierra la conexión 
$conn->close();
?>
