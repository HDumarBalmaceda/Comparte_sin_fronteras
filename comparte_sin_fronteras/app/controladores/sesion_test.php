<?php
session_start();
$_SESSION["test"] = "Sesión funcionando";
echo "Sesión iniciada. Ahora prueba abrir test_session_2.php";
?>