<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php'; // conexión PDO

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->accion) && $data->accion === "SubirFoto") {
  subirFoto($conn, $data);
} else {
  echo json_encode(["result" => "Sin data o acción inválida"]);
}

function subirFoto($conn, $data) {
  $res = new stdClass();

  try {
    if (!isset($data->archivo, $data->titulo, $data->usuario_id)) {
      throw new Exception("Faltan campos requeridos.");
    }

    $base64 = $data->archivo;
    $titulo = $data->titulo;
    $descripcion = isset($data->descripcion) ? $data->descripcion : "";
    $usuario_id = $data->usuario_id;

    // Validación del base64
    if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
      $base64 = substr($base64, strpos($base64, ',') + 1);
      $extension = strtolower($type[1]);
    } else {
      throw new Exception("Formato de imagen inválido");
    }

    $decoded = base64_decode($base64);
    if ($decoded === false) {
      throw new Exception("Contenido Base64 inválido");
    }

    $carpeta = "./uploads/";
    $nombreArchivo = $titulo . "." . $extension;
    $ruta = $carpeta . $nombreArchivo;
    file_put_contents($ruta, $decoded);

    $rutaGuardada = "https://rallycochesjrm.com/BackEnd/uploads/" . $nombreArchivo;

    $sql = "INSERT INTO fotos (usuario_id, titulo, descripcion, archivo) 
            VALUES (:usuario_id, :titulo, :descripcion, :archivo)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
    $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
    $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
    $stmt->bindParam(':archivo', $rutaGuardada, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Foto registrada exitosamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al registrar la foto."]);
    }
  } catch (Exception $e) {
    $res->result = "ERROR";
    $res->error = $e->getMessage();
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
  }
}


?>