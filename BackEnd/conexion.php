<?php
$host = 'PMYSQL189.dns-servicio.com:3306';
$db = '10943070_rally_fotografico';
$user = 'root123';
$pass = 'zf2#4C97l';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try {
    $conn = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>