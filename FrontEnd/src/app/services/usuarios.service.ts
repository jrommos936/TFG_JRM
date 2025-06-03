import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = environment.API_URL;
  constructor(private http: HttpClient) { }

  getUsuarios(){
    let body = {
      accion: 'ListarUsuarios'
    }
    console.log('cuerpo: ',body);
    return this.http.post(this.url, body);
  }

  anadeUsuario(usuario: Usuario){
    let body = {
      accion: 'AnadeUsuario',
      usuario: usuario
    }
    console.log('cuerpo: ',body);
    return this.http.post(this.url, body);
  }

  obtenerUsuarioId(id: number){
    let body = {
      accion: 'ObtenerUsuarioId',
      id: id
    }
    console.log('cuerpo: ',body);
    return this.http.post(this.url, body);
  }

  editarUsuario(usuario: Usuario){
    let body = {
      accion: 'ModificaUsuario',
      usuario: usuario
    }
    console.log('cuerpo: ',body);
    return this.http.post(this.url, body);
  }

  borrar(id: number){
    let body = JSON.stringify({
      accion: "EliminaUsuario",
      id: id
    });
    console.log('cuerpo: ',body);

    return this.http.post<Usuario[]>(this.url, body);
    
  }
}
