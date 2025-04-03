<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../librerias/PHPmailer/src/PHPMailer.php';
require '../../librerias/PHPmailer/src/SMTP.php';
require '../../librerias/PHPmailer/src/Exception.php';
require '../../librerias/config_correo.php';

function enviarCorreo($destinatario, $asunto, $cuerpo) {
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP usando las constantes del config
        $mail->isSMTP();
        $mail->Host = CORREO_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = CORREO_USUARIO;
        $mail->Password = CORREO_CONTRASEÑA;
        $mail->SMTPSecure = CORREO_SMTP_SECURE;
        $mail->Port = CORREO_PUERTO;

        // Configuración del correo
        $mail->setFrom(CORREO_USUARIO, CORREO_NOMBRE);
        $mail->addAddress($destinatario); // Destinatario
        $mail->isHTML(true); // Permitir HTML en el correo
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $asunto;
        $mail->Body = $cuerpo;

        // Enviar correo
        if ($mail->send()) {
            return "Correo enviado con éxito a $destinatario";
        } else {
            return "Error al enviar el correo: " . $mail->ErrorInfo;
        }
    } catch (Exception $e) {
        return "Error en el envío: " . $mail->ErrorInfo;
    }
}

?>
