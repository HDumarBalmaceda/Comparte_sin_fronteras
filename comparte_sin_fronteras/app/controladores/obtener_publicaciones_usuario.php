<?php
session_start();

include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401); // No autorizado
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

$sql = "SELECT * FROM publicaciones WHERE usuario_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

$publicaciones = [];
while ($row = $result->fetch_assoc()) {
    $publicaciones[] = $row;
}

echo json_encode($publicaciones);
?>
