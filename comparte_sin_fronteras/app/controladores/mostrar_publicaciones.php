<?php
// Conexión con la base de datos
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

//obtiene los datos de la tabla publicaciones y las que estan relacionadas con ella que son categoria y usuario
$sql = "SELECT p.*, c.nombre AS nombre_categoria, u.nombre AS nombre_usuario
        FROM publicaciones p
        JOIN categorias c ON p.categoria_id = c.id
        JOIN usuarios u ON p.usuario_id = u.id
        WHERE p.estado = 'disponible'
        ORDER BY p.fecha_publicacion DESC"; // ordena las publicaciones desde la mas reciente 

$resultado = $conn->query($sql); // ejecuta la consulta y la guarda en la variable 

$publicaciones = []; // hace un areglo vacio que va al front

// toma el resultado de la consulta sql y lo manda a publicaciones
while ($fila = $resultado->fetch_assoc()) {
    $fila['imagen'] = '/comparte_sin_fronteras/imagenes/publicaciones/' . basename($fila['imagen']);
    $publicaciones[] = $fila;
}

header('Content-Type: application/json');// manda la respuesta en json
echo json_encode($publicaciones); // imprime el arreglo en json 
?>