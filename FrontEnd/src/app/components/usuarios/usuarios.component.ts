import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink,

  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  public usuarios: Usuario[] = [];
  public usuarioDetail: Usuario = <Usuario>{};

  constructor(private peti: UsuariosService, private router: Router, private ruta: ActivatedRoute){}

  ngOnInit(){
    this.peti.getUsuarios().subscribe((data: any) => {
      console.log('data: ', data);
      this.usuarios = data;
    });
  }

  borrarUsuario(id :number){

    if(confirm("¿Estas seguro de que quieres eliminar al usuario con id: " + id + " ?")){
      this.peti.borrar(id).subscribe(datos =>{
        console.log(datos);
        this.ngOnInit();
      })
    }  
  }
}