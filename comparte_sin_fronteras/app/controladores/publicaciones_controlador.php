<?php
session_start();

// Conexión con la base de datos
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;


// Verifica que la solicitud sea por POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit();
}

// Verifica que el usuario esté autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no autenticado']);
    exit();
}

$id_usuario = $_SESSION['usuario_id']; // ID del usuario actual

// Recibir los datos del formulario
$titulo = $_POST['titulo'] ?? null;
$categoria = $_POST['categoria'] ?? null;
$estado = 'disponible';
$descripcion = $_POST['descripcion'] ?? null;

// Verifica que todos los campos están completos, incluyendo la imagen
if (empty($titulo) || empty($categoria) || empty($descripcion) || !isset($_FILES['foto']) || $_FILES['foto']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos, incluida la imagen, son obligatorios.']);
    exit();
}
/*// Verifica que todos los campos están completos
if (empty($titulo) || empty($categoria) || empty($descripcion)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
    exit();
}*/

// Manejo de la imagen
$directorio = __DIR__ . '/../../imagenes/publicaciones/';
if (!file_exists($directorio)) {
    mkdir($directorio, 0777, true);
}

$imagen_publicacion = null; // Valor por defecto si no se sube imagen

if (!empty($_FILES['foto']['name'])) {
    $extension = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    $nombre_imagen = "publicacion_" . $id_usuario . '_' . time() . '.' . $extension; // Nombre único
    $ruta_completa = $directorio . $nombre_imagen;

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_completa)) {
        $imagen_publicacion = "imagenes/publicaciones/" . $nombre_imagen;
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al subir la imagen']);
        exit();
    }
}

// Insertar la publicación en la base de datos
$stmt = $conn->prepare('INSERT INTO publicaciones (categoria_id, titulo, descripcion, imagen, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)');
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la consulta']);
    exit();
}

$stmt->bind_param('sssssi', $categoria, $titulo, $descripcion, $imagen_publicacion, $estado, $id_usuario);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Publicación subida con éxito']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al subir la publicación']);
}

$stmt->close();
$conn->close();

?>