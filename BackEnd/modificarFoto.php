<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php'; // conexión PDO

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->accion) && $data->accion === "ModificarFoto") {
  modificarFoto($conn, $data->foto);
} else {
  echo json_encode(["result" => "Sin data o acción inválida"]);
}

function modificarFoto($conn, $foto) {
  $res = new stdClass();

  try {
    if (!isset($foto->archivo, $foto->titulo, $foto->id)) {
      throw new Exception("Faltan campos requeridos.");
    }

    $base64 = $foto->archivo;
    $titulo = $foto->titulo;
    $descripcion = isset($foto->descripcion) ? $foto->descripcion : "";
    $id = $foto->id;

    // Validación del base64
    if (preg_match('/^data:image\/(\w+);base64,/', $base64, $type)) {
      $base64 = substr($base64, strpos($base64, ',') + 1);
      $extension = strtolower($type[1]);
      $decoded = base64_decode($base64);
      if ($decoded === false) {
        throw new Exception("Contenido Base64 inválido");
      }
      $carpeta = "./uploads/";
      $nombreArchivo = $titulo . "_" . $id . "." . $extension;
      $ruta = $carpeta . $nombreArchivo;
      file_put_contents($ruta, $decoded);
      $rutaGuardada = "https://rallycochesjrm.com/BackEnd/uploads/" . $nombreArchivo;
    } else {
      // Si no es base64, se asume que es una URL ya existente
      $rutaGuardada = $base64;
    }

    $sql = "UPDATE fotos SET titulo = :titulo, descripcion = :descripcion, archivo = :archivo WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':titulo', $titulo, PDO::PARAM_STR);
    $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
    $stmt->bindParam(':archivo', $rutaGuardada, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
      echo json_encode(["status" => "success", "message" => "Foto modificada exitosamente."]);
    } else {
      echo json_encode(["status" => "error", "message" => "Error al modificar la foto."]);
    }
  } catch (Exception $e) {
    $res->result = "ERROR";
    $res->error = $e->getMessage();
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
  }
}
?>