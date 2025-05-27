<?php

include_once 'conexion.php';

class Modelo
{

	private $pdo;

	public function __CONSTRUCT()
	{
		try {
			$opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
			$this->pdo = new PDO('mysql:host=localhost;dbname=rally_fotografico', 'root', '', $opciones);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}


	public function ListarUsuarios()
	{
		try {
			$sc = "SELECT id, nombre, correo, contrasena, rol FROM usuarios";
			$stm = $this->pdo->prepare($sc);
			$stm->execute();
			return ($stm->fetchAll(PDO::FETCH_ASSOC));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ObtenerOwnerId($id)
	{
		try {
			$sc = "Select id, nombre, correo, rol FROM usuarios WHERE id = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function AnadeUsuario($data)
	{
		try {
			$sql = "INSERT INTO usuarios (nombre, correo, contrasena, rol) 
							VALUES (?, ?, ?, ?)";
			$hash = password_hash($data->contrasena, PASSWORD_DEFAULT);
			$this->pdo->prepare($sql)->execute(array(
				$data->nombre,
				$data->correo,
				$hash,
				$data->rol
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ModificaUsuario($data)
	{
		try {
			$sql = "UPDATE usuarios SET 
									nombre      = ?, 
									correo      = ?,
									rol 		= ?
							WHERE id = ?";
			$this->pdo->prepare($sql)->execute(array(
				$data->nombre,
				$data->correo,
				$data->rol,
				$data->id
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function EliminaUsuario($id)
	{
		try {
			$sql = "DELETE FROM usuarios WHERE id = ?";
			$this->pdo->prepare($sql)->execute(array($id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	// FOTOS

	public function ListarFotosAceptadas()
	{
		try {
			$sql = "SELECT u.nombre, f.titulo, f.descripcion, f.archivo FROM fotos f JOIN usuarios u ON f.usuario_id = u.id WHERE estado = 'aceptada'";
			$stm = $this->pdo->prepare($sql);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ListarFotos()
	{
		try {
			$sql = "SELECT u.nombre, f.titulo, f.descripcion, f.archivo, f.estado FROM fotos f JOIN usuarios u ON f.usuario_id = u.id";
			$stm = $this->pdo->prepare($sql);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ObtenerUsuarioId($id)
	{
		try {
			$sc = "SELECT id, nombre, correo, rol FROM usuarios WHERE id = ?";
			$stm = $this->pdo->prepare($sc);
			$stm->execute(array($id));
			return ($stm->fetch(PDO::FETCH_OBJ));
		} catch (Exception $e) {
			die(json_encode([
				'success' => false,
				'message' => 'Error al obtener usuario: ' . $e->getMessage()
			]));
		}
	}

	public function ListarFotosPendientes()
	{
		try {
			$sql = "SELECT f.id, u.nombre, f.titulo, f.descripcion, f.archivo FROM fotos f JOIN usuarios u ON f.usuario_id = u.id WHERE estado = 'pendiente'";
			$stm = $this->pdo->prepare($sql);
			$stm->execute();
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function ListarFotosPorUsuario($usuario_id)
	{
		try {
			$sql = "SELECT * FROM fotos WHERE usuario_id = ?";
			$stm = $this->pdo->prepare($sql);
			$stm->execute(array($usuario_id));
			return $stm->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function eliminarFoto($id)
	{
		try {
			$sql = "DELETE FROM fotos WHERE id = ?";
			$this->pdo->prepare($sql)->execute(array($id));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function CambiarEstadoFoto($id, $estado)
	{
		try {
			$sql = "UPDATE fotos SET estado = ? WHERE id = ?";
			$this->pdo->prepare($sql)->execute([$estado, $id]);
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ModificarFoto($data)
	{
		try {
			$sql = "UPDATE fotos SET 
									titulo      = ?, 
									descripcion = ?,
									archivo     = ?
						WHERE id = ?";
			$this->pdo->prepare($sql)->execute(array(
				$data->titulo,
				$data->descripcion,
				$data->archivo,
				$data->id
			));
			return true;
		} catch (Exception $e) {
			die($e->getMessage());
			return false;
		}
	}

	public function ObtenerFotoId($id)
	{
		try {
			$sql = "SELECT id, titulo, descripcion, archivo FROM fotos WHERE id = ?";
			$stm = $this->pdo->prepare($sql);
			$stm->execute(array($id));
			return $stm->fetch(PDO::FETCH_OBJ);
		} catch (Exception $e) {
			die(json_encode([
				'success' => false,
				'message' => 'Error al obtener foto: ' . $e->getMessage()
			]));
		}
	}


}
