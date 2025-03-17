<?php

header('Content-Type: application/json'); // Asegura que la respuesta es JSON
header('Access-Control-Allow-Origin: *'); // Permitir acceso desde cualquier origen
header('Access-Control-Allow-Methods: POST'); // Solo permite POST
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');


// Verifica que la solicitud sea por POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit();
}

// Conexión con la base de datos
include_once __DIR__ . '/../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verifica si la conexión con la base de datos es válida
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos']);
    exit();
}

// Recibir los datos del formulario
$nombre = $_POST['nombre'] ?? null;
$email = $_POST['email'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$password = $_POST['password'] ?? null;

// Verifica que todos los campos están completos
if (empty($nombre) || empty($email) || empty($telefono) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
    exit();
}

// Verifica si el correo ya está registrado
$stmt = $conn->prepare('SELECT id FROM usuarios WHERE email = ?');
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la consulta']);
    exit();
}

$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'El correo ya está registrado']);
    exit();
}

// Cifrar la contraseña antes de almacenarla
$password_hashed = password_hash($password, PASSWORD_BCRYPT);

// Insertar el nuevo usuario en la base de datos
$stmt = $conn->prepare('INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)');
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la consulta de inserción']);
    exit();
}

$stmt->bind_param('ssss', $nombre, $email, $telefono, $password_hashed);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registro exitoso']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al registrar el usuario']);
}

// Cierra la conexión
$stmt->close();
$conn->close();
?>