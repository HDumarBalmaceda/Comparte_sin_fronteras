<?php
session_start();

session_destroy(); // Destruye todas las sesiones activas
header("Location: ../../Index.html"); // Redirige al usuario a la página principal
exit();
?>