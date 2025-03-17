<?php
session_start();
if (isset($_SESSION["test"])) {
    echo "La sesión persiste: " . $_SESSION["test"];
} else {
    echo "La sesión no se guardó.";
}
?>