import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private url = environment.REGISTRO_URL;

  constructor(private http: HttpClient) { }


  registro(nombre: string, correo: string, contrasena: string, rol: string) {
    let body = {
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
      rol: rol
    };

    console.log('Enviando:', body);
    return this.http.post(this.url, body);
  }
  
}
