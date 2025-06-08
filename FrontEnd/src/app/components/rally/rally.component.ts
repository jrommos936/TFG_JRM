import { Component } from '@angular/core';
import { Fotos } from '../../models/fotos';
import { RallyService } from '../../services/rally.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; 
import { Usuario } from '../../models/usuario';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rally',
  imports: [CardModule, ButtonModule, DialogModule, RouterLink],
  templateUrl: './rally.component.html',
  styleUrl: './rally.component.css'
})
export class RallyComponent {
  fotos: Fotos[] = [];
  fotosPendientes: Fotos[] = [];
  usuario: Usuario = <Usuario>{};
  display = false;
  selectedImage: string | null = null;
  esAdmin = false;
  isLoggedIn: boolean = false;
  rol: boolean = false;
  esParticpante = false;


  constructor(private rallyService: RallyService) {}

  ngOnInit(): void {
    this.rallyService.listarFotosAceptadas().subscribe({
      next: (data) => this.fotos = data,
      error: (err) => console.error(err)
    });

    this.isLoggedIn = !!localStorage.getItem('token');

    const usuarioStr = localStorage.getItem('rol');
    if (usuarioStr == 'admin') {
      this.esAdmin = true;
      this.esParticpante = true;
      if (this.esAdmin) {
        this.cargarFotosPendientes();
      }
    } else if (usuarioStr == 'participante') {
      this.esParticpante = true;
    }
  }

  cargarFotosPendientes() {
    this.rallyService.listarFotosPendientes().subscribe({
      next: (data) => this.fotosPendientes = data,
      error: (err) => console.error(err)
    });
  }

  showImage(archivo: string) {
    this.selectedImage = archivo;
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    this.selectedImage = null;
  }

  aceptarFoto(foto: Fotos) {
    this.rallyService.cambiarEstadoFoto(foto.id, 'aceptada').subscribe(() => {
      this.cargarFotosPendientes();
      this.rallyService.listarFotosAceptadas().subscribe({
        next: (data) => this.fotos = data
      });
    });
  }

  rechazarFoto(foto: Fotos) {
    this.rallyService.cambiarEstadoFoto(foto.id, 'rechazada').subscribe(() => {
      this.cargarFotosPendientes();
    });
  }

  eliminarFoto(foto: Fotos) {
    this.rallyService.eliminarFoto(foto.id).subscribe(() => {
      this.cargarFotosPendientes();
      this.rallyService.listarFotosAceptadas().subscribe({
        next: (data) => this.fotos = data
      });
    });
  }

  

}
