<?php
session_start(); // Iniciar sesión para acceder a las variables de sesión

// Conexión a la base de datos 
include_once __DIR__ . '/../../conexion/Conexion_db.php';
$database = new Conexion();
$conn = $database->conn;

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    die("Acceso denegado");
}

// Recibe los datos del usuario 
$id_usuario = $_SESSION['usuario_id']; // ID del usuario autenticado
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$ciudad = $_POST['ciudad'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';

// Verificar si el nuevo email ya existe en otro usuario
if (!empty($email)) {
    $sql_check = "SELECT id FROM usuarios WHERE email = ? AND id != ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("si", $email, $id_usuario);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        die("Error: Este correo ya está en uso por otro usuario.");
    }
    $stmt_check->close();
}

// Manejo de la imagen
$directorio = __DIR__ . '/../../imagenes/usuarios/'; 
if (!file_exists($directorio)) {
    mkdir($directorio, 0777, true); 
}

$foto_perfil = "";
if (!empty($_FILES['foto']['name'])) {
    // Obtener la extensión del archivo
    $extension = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    $foto_perfil = "usuarios/" . $id_usuario . '.' . $extension;
    $ruta_completa = $directorio . $id_usuario . '.' . $extension;
    
    // Eliminar la imagen anterior si existe
    $stmt = $conn->prepare("SELECT foto_perfil FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id_usuario);
    $stmt->execute();
    $resultado = $stmt->get_result();
    if ($fila = $resultado->fetch_assoc()) {
        $imagen_anterior = __DIR__ . '/../../imagenes/' . $fila['foto_perfil'];
        if (!empty($fila['foto_perfil']) && file_exists($imagen_anterior)) {
            unlink($imagen_anterior); // Eliminar imagen antigua
        }
    }
    $stmt->close();
    
    // Mover la nueva imagen
    move_uploaded_file($_FILES['foto']['tmp_name'], $ruta_completa);
}

// Crear consulta dinámica para actualizar solo los campos que no están vacíos
$campos = [];
$valores = [];

if (!empty($nombre)) { $campos[] = "nombre=?"; $valores[] = $nombre; }
if (!empty($email)) { $campos[] = "email=?"; $valores[] = $email; }
if (!empty($telefono)) { $campos[] = "telefono=?"; $valores[] = $telefono; }
if (!empty($ciudad)) { $campos[] = "ciudad=?"; $valores[] = $ciudad; }
if (!empty($descripcion)) { $campos[] = "descripcion=?"; $valores[] = $descripcion; }
if (!empty($foto_perfil)) { $campos[] = "foto_perfil=?"; $valores[] = $foto_perfil; }

if (!empty($campos)) {
    $sql = "UPDATE usuarios SET " . implode(", ", $campos) . " WHERE id=?";
    $valores[] = $id_usuario; // Agregar ID al final
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(str_repeat("s", count($valores) - 1) . "i", ...$valores);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Perfil actualizado correctamente"]);;
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar el perfil: " . $conn->error]);
    }
    $stmt->close();
} else {
    echo "No hay datos para actualizar.";
}

$conn->close();