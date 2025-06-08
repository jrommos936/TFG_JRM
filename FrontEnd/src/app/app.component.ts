import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Rally_Fotografico';
  menu: MenuItem[] = [];
  currentYear: number = new Date().getFullYear();
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    this.updateMenu();
  }

  updateMenu() {
    this.isLoggedIn = !!localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    this.menu = [
      { label: 'Inicio', routerLink: '/' },
      { label: 'Normativa', routerLink: '/normativa' },
      { label: 'Rally', routerLink: '/rally' },
      { label: 'Inicia sesión', routerLink: '/login', visible: !this.isLoggedIn },
      { label: 'Mi Perfil', routerLink: '/perfil', visible: this.isLoggedIn },
    ];
    if (rol === 'admin') {
      this.menu.push({ label: 'Usuarios', routerLink: '/usuarios' });
    }
    if (this.isLoggedIn) {
      this.menu.push({
        label: 'Cerrar sesión',
        command: () => this.cerrarSesion()
      });
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    alert('Sesión cerrada correctamente');
    this.updateMenu();
    window.location.href = '/';

  }
}
