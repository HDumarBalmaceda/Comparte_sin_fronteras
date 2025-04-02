<?php

// Conexión a la base de datos 
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verifica que la solicitud sea por GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit();
}

// Consulta las categorías
$sql = "SELECT id, nombre FROM categorias";
$resultado = $conn->query($sql);

$categorias = [];
while ($fila = $resultado->fetch_assoc()) {
    $categorias[] = $fila;
}

echo json_encode($categorias);

$conn->close();
?>