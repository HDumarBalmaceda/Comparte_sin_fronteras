<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["error" => "No autenticado"]);
    exit;
}

// Asegurar que la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conexion = $database->conn;

$id_usuario = $_SESSION['usuario_id'];

// Ejecutar la eliminación
$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id_usuario);

if ($stmt->execute()) {
    session_destroy();
    echo json_encode(["success" => "Cuenta eliminada correctamente"]);
} else {
    echo json_encode(["error" => "Hubo un problema al eliminar la cuenta"]);
}

$stmt->close();
$conexion->close();
?>

