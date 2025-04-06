<?php
require '../../librerias/correos.php'; // Ajusta la ruta si es necesario

// Prueba enviando un correo a tu cuenta personal
$destinatario = 'hdumarb@gmail.com';  // Cámbialo por un correo tuyo
$asunto = 'Prueba de envio de correo';
$cuerpo = '<h2>Hola, esto es una prueba desde PHP</h2><p>Si ves este mensaje, el correo funciona correctamente.</p>';

$resultado = enviarCorreo($destinatario, $asunto, $cuerpo);
echo $resultado;
?>