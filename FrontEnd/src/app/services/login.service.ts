import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.LOGIN_URL;

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string) {
    let body = {
      correo: correo,
      contrasena: contrasena
    };
    console.log(body);
    return this.http.post(this.url, body);
  }
  

}
