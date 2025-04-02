<?php
session_start();

// Evitar múltiples llamadas a session_start()
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "No autorizado"]);
    exit;
}

// Incluir la conexión a la base de datos
require(__DIR__ . "/../../conexion/Conexion_db.php");
$database = new Conexion();
$conexion = $database->conn;

// Obtener el ID del usuario de la sesión
$usuario_id = $_SESSION['usuario_id'];

// Consultar la información del usuario en la base de datos
$sql = "SELECT nombre, email, telefono, ciudad, descripcion, foto_perfil FROM usuarios WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();

// Configurar la cabecera para devolver JSON
header("Content-Type: application/json");

if ($result->num_rows > 0) {
    $usuario = $result->fetch_assoc();
    echo json_encode(["status" => "success", "data" => $usuario]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
}

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>