import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../services/login.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from '../../app.component'; // Importa el AppComponent

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public form: FormGroup;

  constructor(
    private peti: LoginService,
    private ruta: Router,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private appComponent: AppComponent // Inyecta el AppComponent
  ) {
    this.form = this.fb.group({
      correo: this.fb.control('', [Validators.required, Validators.email]),
      contrasena: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.peti.login(this.form.value.correo, this.form.value.contrasena).subscribe({
        next: (response: any) => {
          if (response.success) {
            if (response.token) {
              localStorage.setItem('token', response.token);
            }
            if (response.rol) {
              localStorage.setItem('rol', response.rol);
            }
            this.appComponent.updateMenu();
            alert(response.message);
            this.ruta.navigate(['/']);
          } else {
            alert(response.message);
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}