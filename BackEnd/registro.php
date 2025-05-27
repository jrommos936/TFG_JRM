<?php
header("Access-Control-Allow-Origin: *"); // allow request from all origin 
header('Access-Control-Allow-Credentials: true'); 
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT"); 
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
header('Content-Type: application/json'); // Todo se devolverá en formato JSON.
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
include 'conexion.php';

header('Content-Type: application/json'); // Asegura respuesta JSON
$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(['error' => 'No se recibieron datos validos']);
    exit;
}

$nombre = $data->nombre ?? '';
$correo = $data->correo ?? '';
$contrasena = $data->contrasena ?? '';

if (!$nombre || !$correo || !$contrasena) {
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}

$hash = password_hash($contrasena, PASSWORD_DEFAULT);
$rol = $data->rol ?? 'participante'; // Valor por defecto

$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)");
try {
    $stmt->execute([$nombre, $correo, $hash, $rol]);
    echo json_encode(['message' => 'Usuario registrado con éxito']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'El correo ya está registrado']);
}
?>


