import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  obtenerUsuarioActual(): Observable<Usuario> {
    const body = {
      accion: 'ObtenerUsuarioId',
      id: this.obtenerIdUsuarioDesdeToken()
    };
    console.log('cuerpo:', body);
    return this.http.post<Usuario>(this.apiUrl, body);
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    const body = {
      accion: 'ModificaUsuario',
      usuario: {
        id: this.obtenerIdUsuarioDesdeToken(),
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    };
    console.log('cuerpo:', body);
    return this.http.post(this.apiUrl, body);
  }

  private obtenerIdUsuarioDesdeToken(): number {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en localStorage');
      return 0;
    }
    // El token es el ID directamente
    const id = Number(token);
    if (isNaN(id)) {
      console.error('El token no es un número válido:', token);
      return 0;
    }
    return id;
  }
}