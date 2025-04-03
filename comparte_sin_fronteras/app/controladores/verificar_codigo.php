<?php 
// Conexión a la base de datos 
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verifica si el código fue enviado
if (!isset($_POST['codigo']) || empty($_POST['codigo'])) {
    echo json_encode(["success" => false, "message" => "Por favor, ingresa un código."]);
    exit;
}

$codigo = $_POST['codigo'];

// Verifica si el código existe y si no ha expirado
$stmt = $conn->prepare("SELECT id FROM codigos_verificacion WHERE codigo = ? AND expiracion > NOW()");
$stmt->bind_param("s", $codigo);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => true, "message" => "Verificación exitosa."]);
} else {
    echo json_encode(["success" => false, "message" => "Código incorrecto o expirado."]);
}

$stmt->close();
$conn->close();
?>
