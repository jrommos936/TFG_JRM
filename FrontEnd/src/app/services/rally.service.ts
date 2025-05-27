import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fotos } from '../models/fotos';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RallyService {
  private apiUrl = 'http://localhost/clase/TFG_JRM/BackEnd/subirFoto.php';
  private url = environment.API_URL;
  private urlmod = 'http://localhost/clase/TFG_JRM/BackEnd/modificarFoto.php';

  constructor(private http: HttpClient) { }


  getUsuarioId(){
    return localStorage.getItem('token');
  }

  listarFotosAceptadas(): Observable<Fotos[]> {
    const body = { accion: 'ListarFotosAceptadas' };
    return this.http.post<Fotos[]>(this.url, body);
  }

  subirFoto(titulo: string, descripcion: string, archivo: string){
    const body = {
      accion: 'SubirFoto',
      titulo: titulo,
      descripcion: descripcion,
      archivo: archivo,
      usuario_id: this.getUsuarioId()
    };
    
    return this.http.post(this.apiUrl, body);
  }

  listarFotosPendientes(): Observable<Fotos[]> {
    const body = { 
      accion: 'ListarFotosPendientes' 
    };
    return this.http.post<Fotos[]>(this.url, body);
  }

  listarFotosPorUsuario(usuario_id: number): Observable<Fotos[]> {
    const body = { 
      accion: 'ListarFotosPorUsuario',
      usuario_id: this.getUsuarioId() 
    };
    return this.http.post<Fotos[]>(this.url, body);
  }

  cambiarEstadoFoto(id: number, estado: string) {
    const body = { 
      accion: 'CambiarEstadoFoto',
      id: id,
      estado: estado
    };
    return this.http.post(this.url, body);
  }

  eliminarFoto(id: number) {
    const body = { 
      accion: 'EliminarFoto', 
      id: id 
    };
    console.log(body);
    return this.http.post(this.url, body);
  }

  modificarFoto(foto: any) {
    const body = { 
      accion: 'ModificarFoto', 
      foto: foto
    };
    return this.http.post(this.urlmod, body);
  }

  obternerFotoPorId(id: number): Observable<Fotos> {
    const body = { 
      accion: 'ObtenerFotoId',
      id: id
    };
    return this.http.post<Fotos>(this.url, body);
  }
}