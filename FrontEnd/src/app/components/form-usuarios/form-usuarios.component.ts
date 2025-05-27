import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './form-usuarios.component.html',
  styleUrl: './form-usuarios.component.css'
})
export class FormUsuariosComponent {
  public listaUsuarios: Usuario[] = [];
  public form: FormGroup;
  public textoBoton: string;
  public usuario: Usuario = <Usuario>{};

  constructor(private peti: UsuariosService, private ruta: Router, private router: ActivatedRoute, private fb: FormBuilder) {
    this.textoBoton = 'Añadir;'

    this.form = this.fb.group({
      id: this.fb.control(-1),
      nombre: this.fb.control('', [Validators.required]),
      correo: this.fb.control('', [Validators.required, Validators.email]),
      contrasena: this.fb.control(''),
      rol: this.fb.control('', [Validators.required]),
    })
 }

  ngOnInit(){
    const usuarioId = this.router.snapshot.params['id'];
    if(usuarioId == -1){
      this.textoBoton = 'Añadir';
    } else{
      this.textoBoton = 'Modificar';
      this.peti.obtenerUsuarioId(usuarioId).subscribe({
        next: res => {
        console.log("USUARIO ELEJIDO",res);
        this.form.patchValue(res);
      },
      error: err => {
        console.log(err);
        }
    })
    }

  }

onSubmit() {

  console.log("form: ", this.form.value);    

   if(this.form.value.id == -1){
    this.peti.anadeUsuario(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.ruta.navigate(['usuarios']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  } else{
    this.peti.editarUsuario(this.form.value).subscribe({
      next: (data) => {
        console.log(data);
        this.ruta.navigate(['usuarios']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    })
  }

}

cancelarFormulario(usuarioId: number) {
  if (usuarioId == -1) {
    this.ruta.navigate(["usuarios"]);
  } else {
    this.ruta.navigate(["usuarios"]);
  }
}
}
