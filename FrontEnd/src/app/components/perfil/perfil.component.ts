import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { PerfilService } from '../../services/perfil.service';
import { RallyService } from '../../services/rally.service'; // Añade esta línea
import { Fotos } from '../../models/fotos'; // Añade esta línea si tienes el modelo
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog'; // <-- Añade esta línea
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardModule, DialogModule, RouterLink], // <-- Añade DialogModule aquí
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  perfilForm: FormGroup;
  editando = false;
  cargando = true;
  mensajeExito = '';
  mensajeError = '';
  fotosUsuario: Fotos[] = [];
  display = false; 
  selectedImage: string | null = null; 

  constructor(
    private perfilService: PerfilService,
    private fb: FormBuilder,
    private rallyService: RallyService
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.cargando = true;
    this.perfilService.obtenerUsuarioActual()
      .pipe(
        finalize(() => this.cargando = false)
      )
      .subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          this.perfilForm.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
          });
          if (usuario && usuario.id) {
            this.cargarFotosPorUsuario(usuario.id);
          }
        },
        error: (err) => {
          console.error('Error al cargar usuario', err);
          this.mensajeError = 'No se pudo cargar la información del usuario';
        }
      });
  }

  cargarFotosPorUsuario(usuarioId: number): void {
    this.rallyService.listarFotosPorUsuario(usuarioId).subscribe({
      next: (fotos) => {
        this.fotosUsuario = fotos;
      },
      error: (err) => {
        console.error('Error al cargar fotos del usuario', err);
      }
    });
  }

  toggleEdicion(): void {
    this.editando = !this.editando;
    this.mensajeExito = '';
    this.mensajeError = '';
    
    if (!this.editando) {
      this.perfilForm.patchValue({
        nombre: this.usuario?.nombre,
        correo: this.usuario?.correo
      });
    }
  }

  guardarCambios(): void {
    if (this.perfilForm.invalid || !this.usuario) return;

    const datosActualizados = {
      ...this.usuario,
      nombre: this.perfilForm.value.nombre,
      correo: this.perfilForm.value.correo
    };

    this.cargando = true;
    this.perfilService.actualizarUsuario(datosActualizados)
      .pipe(
        finalize(() => this.cargando = false)
      )
      .subscribe({
        next: () => {
          this.usuario = datosActualizados;
          this.editando = false;
          this.mensajeExito = 'Perfil actualizado correctamente';
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (err) => {
          console.error('Error al actualizar usuario', err);
          this.mensajeError = 'Error al actualizar el perfil';
          setTimeout(() => this.mensajeError = '', 3000);
        }
      });
  }

  eliminarFoto(foto: Fotos) {
    this.rallyService.eliminarFoto(foto.id).subscribe(() => {
      this.cargarFotosPorUsuario(this.usuario?.id || 0);
    });
  }
}