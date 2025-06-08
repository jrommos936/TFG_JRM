<?php
header("Access-Control-Allow-Origin: *"); // allow request from all origin 
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
header('Content-Type: application/json'); // Todo se devolverá en formato JSON.
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');


/*
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');  //  Todo se devolverá en formato JSON.
*/


require_once 'modelos.php';
$modelo = new Modelo();

//  Con esta línea recogemos los datos (en formato JSON), enviados por el cliente:
$datos = file_get_contents('php://input');  
//  Lo convertimos a un objeto php:
$objeto = json_decode($datos);


if ($objeto != null) {
    switch ($objeto->accion) {
        //  USUARIOS:
        case "ListarUsuarios":
            print json_encode($modelo->ListarUsuarios());
            break;

        case "ObtenerUsuarioId":
            print json_encode($modelo->ObtenerOwnerId($objeto->id));
            break;

        case "AnadeUsuario":
            if ($modelo->AnadeUsuario($objeto->usuario))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "EliminaUsuario":
            if ($modelo->EliminaUsuario($objeto->id))
                print json_encode($modelo->ListarUsuarios());
            else
                print '{"result":"OK"}';
            break;

        case "ModificaUsuario":
            if ($modelo->ModificaUsuario($objeto->usuario))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        // FOTOS:
        case "ListarFotosAceptadas":
            print json_encode($modelo->ListarFotosAceptadas());
            break;

        case "ListarFotos":
            print json_encode($modelo->ListarFotos());
            break;

        case "ObtenerPerfilUsuario":
            print $modelo->ObtenerUsuarioId($objeto->id);
            break;

        case "ListarFotosPendientes":
            print json_encode($modelo->ListarFotosPendientes());
            break;

        case "ListarFotosPorUsuario":
            print json_encode($modelo->ListarFotosPorUsuario($objeto->usuario_id));
            break;

        case "CambiarEstadoFoto":
            if ($modelo->CambiarEstadoFoto($objeto->id, $objeto->estado))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "EliminarFoto":
            if ($modelo->eliminarFoto($objeto->id))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;
        
        case "ModificarFoto":
            if ($modelo->ModificarFoto($objeto->foto))
                print '{"result":"OK"}';
            else
                print '{"result":"FAIL"}';
            break;

        case "ObtenerFotoId":
            print json_encode($modelo->ObtenerFotoId($objeto->id));
            break;
    }
}
