<?php
session_start();
// Conexion a la base de datos 
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verifica si la conexión con la base de datos falla
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos']);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit();
}
// Recibir los datos del formulario
$nueva = $_POST['nueva'] ?? '';
$confirmar = $_POST['confirmar'] ?? '';

// Verificar si el usuario pasó la validación del código de verificación
if (!isset($_SESSION['usuario_verificado'])) {
    echo json_encode(['status' => 'error', 'message' => 'Acceso no autorizado']);
    exit();
}

// Obtener el ID del usuario verificado
$usuario_id = $_SESSION['usuario_verificado'];


// Verifica que todos los campos estén completos
if (empty($nueva) || empty($confirmar)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
    exit();
}

// Verifica que las contraseñas ingresadas sean iguales
if ($nueva !== $confirmar) {
    echo json_encode(['status' => 'error', 'message' => 'Las contraseñas que ingresaste no coinciden']);
    exit();
}

// Encriptar la nueva contraseña
$nueva_hashed = password_hash($nueva, PASSWORD_DEFAULT);

// Actualizar la contraseña en la base de datos
$stmt = $conn->prepare('UPDATE usuarios SET password = ? WHERE id = ?');
$stmt->bind_param('si', $nueva_hashed, $usuario_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Cambio de contraseña exitoso, redirigiendo a inicio de sesión']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Hubo un error al actualizar la contraseña']);
}

$stmt->close();
$conn->close();
?>
