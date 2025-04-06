<?php
// Conexión a la base de datos 
include_once __DIR__ . '/../../conexion/Conexion_db.php';
include_once __DIR__ . '/../../librerias/correos.php'; // Importamos la función enviarCorreo

$database = new Conexion();
$conn = $database->conn;

header('Content-Type: application/json'); // Configura la respuesta como JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // 1️⃣ Verificar si el email existe en la tabla usuarios
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $usuario_id = $row['id'];

        // 2️⃣ Generar un código aleatorio de 6 dígitos
        $codigo = rand(100000, 999999);
        $expiracion = date("Y-m-d H:i:s", strtotime("+10 minutes")); // Expira en 10 min

        // 3️⃣ Insertar el código en la tabla codigos_verificacion
        $stmt = $conn->prepare("INSERT INTO codigos_verificacion (usuario_id, codigo, expiracion) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $usuario_id, $codigo, $expiracion);
        
        if ($stmt->execute()) {
            // 4️⃣ Enviar el código al correo del usuario
            $asunto = "Código de verificación - Comparte sin Fronteras";
            $cuerpo = "
                <h2>Código de Verificación</h2>
                <p>Hola espero que este muy bien, has solicitado un código de verificación para restablecer tu contraseña.</p>
                <p><strong>Código: $codigo</strong></p>
                <p>Este código expirará en 10 minutos.</p>
            ";

            if (enviarCorreo($email, $asunto, $cuerpo)) {
                echo json_encode(["success" => true, "message" => "Si no ves el correo en tu bandeja de entrada, revisa la carpeta de spam."]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al enviar el correo"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al guardar el código"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "El correo no está registrado"]);
    }
}
?>
