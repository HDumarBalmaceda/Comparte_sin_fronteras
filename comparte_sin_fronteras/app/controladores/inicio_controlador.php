<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();

// Conexión con la base de datos
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verifica si la conexión con la base de datos falla
if (!$conn) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la conexión a la base de datos']);
    exit();
}

// Verifica si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Recibir los datos de correo y contraseña
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Verifica que todos los campos estén completos
    if (empty($email) || empty($password)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
        exit();
    }

    // Preparar la consulta para buscar el usuario por su email
    $stmt = $conn->prepare('SELECT id, password FROM usuarios WHERE email = ?');
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $stmt->store_result();

    // Verifica si se encontró el usuario
    if ($stmt->num_rows == 0) {
        echo json_encode(['status' => 'error', 'message' => 'El correo no está registrado']);
        $stmt->close();
        $conn->close();
        exit();
    }

    // Obtiene los valores de la consulta
    $stmt->bind_result($id, $password_hashed);
    $stmt->fetch();

    // Verifica la contraseña
    if (password_verify($password, $password_hashed)) {
       // Obtener más datos del usuario
    $stmt = $conn->prepare('SELECT nombre, apellido, telefono, direccion, descripcion, foto_perfil FROM usuarios WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();

    // Guardar todos los datos en la sesión
    $_SESSION["usuario_id"] = $id;
    $_SESSION["email"] = $email;
    $_SESSION["nombre"] = $usuario["nombre"];
    $_SESSION["apellido"] = $usuario["apellido"];
    $_SESSION["telefono"] = $usuario["telefono"];
    $_SESSION["direccion"] = $usuario["direccion"];
    $_SESSION["descripcion"] = $usuario["descripcion"];
    $_SESSION["foto_perfil"] = $usuario["foto_perfil"];

    echo json_encode(['status' => 'success', 'message' => 'Inicio exitoso']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta']);
    }

    // Cierra las conexiones
    $stmt->close();
    $conn->close();
}


?>