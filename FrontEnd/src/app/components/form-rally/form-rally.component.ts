import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RallyService } from '../../services/rally.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-rally',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-rally.component.html',
  styleUrls: ['./form-rally.component.css']
})
export class FormRallyComponent {
  showForm: boolean = false;
  form!: FormGroup;
  fotoSeleccionado: boolean = false;
  fImagen: File | null = null;
  inputFile: any = null;
  imagen64: string = "";
  textoBoton: string = '';
  fotoId: number = -1; // Añade esta propiedad arriba en la clase

  constructor(private fb: FormBuilder, private rallyService: RallyService, private router: Router, private ruta: ActivatedRoute) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.fotoId = this.ruta.snapshot.params['id'];
    if(this.fotoId == -1){
      this.textoBoton = 'Añadir';
    } else{
      this.textoBoton = 'Modificar';
      this.rallyService.obternerFotoPorId(this.fotoId).subscribe({
        next: res => {
          this.form.patchValue(res);
          this.imagen64 = res.archivo;
          this.fotoSeleccionado = true;
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  onFileSelected(event: Event): void {
    this.inputFile = event.target;
    this.fImagen = (event.target as HTMLInputElement).files![0];

    var reader = new FileReader();
    reader.onloadend = () => {  
      this.imagen64 = <string>reader.result;
    }
    this.fotoSeleccionado = true;
    reader.readAsDataURL(this.fImagen);
  }

  subirFoto(): void {
    if (this.form.valid && this.fotoSeleccionado) {
      if (this.fotoId == -1) {
        // Añadir nueva foto
        this.rallyService.subirFoto(this.form.value.titulo, this.form.value.descripcion, this.imagen64)
          .subscribe({
            next: () => {
              this.showForm = false;  
              this.fotoSeleccionado = false;
              this.router.navigate(['/rally']);
            },
            error: (error) =>
              console.error('Error al subir la foto:', error)
          });
      } else {
        // Modificar foto existente
        const foto = {
          id: this.fotoId,
          titulo: this.form.value.titulo,
          descripcion: this.form.value.descripcion,
          archivo: this.imagen64
        };
        this.rallyService.modificarFoto(foto)
          .subscribe({
            next: () => {
              this.showForm = false;  
              this.fotoSeleccionado = false;
              this.router.navigate(['/perfil']);
            },
            error: (error) =>
              console.error('Error al modificar la foto:', error)
          });
      }
    }
  }
  cancelarFormulario() {
    const fotoId = this.ruta.snapshot.params['id'];
    if(fotoId == -1){
      this.router.navigate(['/rally']);
    } else{
      this.router.navigate(['/perfil']);
    }
  }
}