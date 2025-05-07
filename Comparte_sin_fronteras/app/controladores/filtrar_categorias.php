<?php
include_once __DIR__ . '/../../conexion/Conexion_db.php';

$database = new Conexion();
$conn = $database->conn;

$sql = "SELECT id, nombre FROM categorias ORDER BY nombre ASC";
$resultado = $conn->query($sql);

$categorias = [];

while ($fila = $resultado->fetch_assoc()) {
    $categorias[] = $fila;
}

header('Content-Type: application/json');
echo json_encode($categorias);

$conn -> close();

?>