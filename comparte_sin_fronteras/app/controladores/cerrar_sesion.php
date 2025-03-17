<?php
session_start(); // inicio de sesion 

$conexionPath = __DIR__ . '/../conexion/Conexion_db.php'; // conexion a la base de datos 

session_destroy();

echo json_encode(["status" => "success","message"=> "Seion cerrada correctamente"]);
exit();
?>