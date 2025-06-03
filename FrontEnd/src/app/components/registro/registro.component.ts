import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ButtonModule,
    RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public form: FormGroup;


  constructor(private peti: RegistroService, private ruta: Router, private router: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: this.fb.control('', [Validators.required]),
      correo: this.fb.control('', [Validators.required, Validators.email]),
      contrasena: this.fb.control('', [Validators.required]),
      rol: this.fb.control(false),
    });

    
  }

  onSubmit() {
  const rol = this.form.value.rol ? 'participante' : 'usuario';

  if (this.form.valid) {
    this.peti.registro(this.form.value.nombre, this.form.value.correo, this.form.value.contrasena, rol).subscribe({
      next: (response) => {
        alert(response || 'Usuario registrado con éxito');
        this.ruta.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.error || 'Error desconocido al registrar el usuario');
      }
    });
  } else {
    alert('Por favor, completa todos los campos correctamente.');
  }
}
}


