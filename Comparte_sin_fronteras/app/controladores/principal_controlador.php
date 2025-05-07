<?php
// Validacion de para mantener el inicio de sesion activo 
session_start();
echo "<pre>";
print_r($_SESSION);
echo "</pre>";
exit();
//Asegura que solo vera esta pantalla si el usuario esta logeado 
if (!isset($_SESSION["email"])) {
    header("Location: ../../Index.html");
    exit();
}


error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json"); // Asegurar que la respuesta sea JSON

// Definir la ruta del archivo de conexión
$conexionPath = __DIR__ . '/../conexion/Conexion_db.php';

// Verificar si el archivo de conexión existe antes de incluirlo
if (!file_exists($conexionPath)) {
    echo json_encode(["status" => "error", "message" => "No se encontró Conexion_db.php en: $conexionPath"]);
    exit();
}

include $conexionPath;

// Crear la conexión a la base de datos
$database = new Conexion();
$conn = $database->conn;

// Verificar si la sesión está iniciada
if (!isset($_SESSION["email"])) {
    echo json_encode(["status" => "error", "message" => "No ha iniciado sesión"]);
    exit();
}

// Si la sesión está activa
echo json_encode(["status" => "success", "message" => "Sesión activa"]);
?>