<?php
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

$usuario_id = $_GET['id']; // Capturar el ID del usuario desde la URL

$sql = "SELECT nombre, descripcion, telefono, email, foto_perfil FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$resultado = $stmt->get_result();
$usuario = $resultado->fetch_assoc();

header('Content-Type: application/json');
echo json_encode($usuario);
?>