<?php
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

$categoria = isset($_GET['categoria']) ? intval($_GET['categoria']) : 0;

$sql = "SELECT p.*, c.nombre AS nombre_categoria, u.nombre AS nombre_usuario
        FROM publicaciones p
        JOIN categorias c ON p.categoria_id = c.id
        JOIN usuarios u ON p.usuario_id = u.id
        WHERE p.estado = 'disponible'";

if ($categoria > 0) {
    $sql .= " AND p.categoria_id = $categoria";
}

$sql .= " ORDER BY p.fecha_publicacion DESC";

$resultado = $conn->query($sql);

$publicaciones = [];

while ($fila = $resultado->fetch_assoc()) {
    $fila['imagen'] = '/comparte_sin_fronteras/imagenes/publicaciones/' . basename($fila['imagen']);
    $publicaciones[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($publicaciones);

?>