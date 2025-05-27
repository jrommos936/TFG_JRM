<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header('Content-Type: application/json; charset=UTF-8');
session_start();
session_unset();
session_destroy();
echo json_encode([
    "success" => true,
    "message" => "Sesión cerrada correctamente."
]);
?>