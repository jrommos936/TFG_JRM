<?php
header("Access-Control-Allow-Origin: *"); // allow request from all origin 
header('Access-Control-Allow-Credentials: true'); 
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT"); 
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
header('Content-Type: application/json; charset=UTF-8');
session_start();
require 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null) {
    $data = $_POST;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim(strtolower($data['correo'] ?? ''));
    $password = $data['contrasena'] ?? '';

    $stmt = $conn->prepare("SELECT id, contrasena, rol FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        if (password_verify($password, $usuario['contrasena'])) {
            $_SESSION['id'] = $usuario['id'];
            $_SESSION['correo'] = $correo;
            // Devuelve el id como token 
            echo json_encode([
                "success" => true,
                "message" => "Inicio de sesión correcto. ¡Bienvenido!",
                "token" => $usuario['id'], 
                "rol" => $usuario['rol']
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Correo o contraseña incorrectos."
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Correo o contraseña incorrectos."
        ]);
    }
}
?>