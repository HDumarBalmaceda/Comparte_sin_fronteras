<?php
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

$database = new Conexion();
$conn = $database->conn;

if ($conn) {
    echo "✅ Conexión exitosa a la base de datos.";
} else {
    echo "❌ Error en la conexión a la base de datos.";
}
?>