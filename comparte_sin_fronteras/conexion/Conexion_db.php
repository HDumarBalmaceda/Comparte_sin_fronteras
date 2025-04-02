<?php
class Conexion {
    private $host = "127.0.0.1";
    private $usuario = "root";
    private $clave = "";
    private $bd = "comparte_sin_fronteras";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->usuario, $this->clave, $this->bd);

        if ($this->conn->connect_error) {
            die(" Error de conexión: " . $this->conn->connect_error);
        }
    }

    // Método para cerrar la conexión (opcional)
    public function cerrarConexion() {
        $this->conn->close();
    }
}
?>