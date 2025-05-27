import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RallyComponent } from './components/rally/rally.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormUsuariosComponent } from './components/form-usuarios/form-usuarios.component';
import { FormRallyComponent } from './components/form-rally/form-rally.component';
import { PerfilComponent } from './components/perfil/perfil.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegistroComponent
    },
    {
        path: 'rally', component: RallyComponent
    },
    {
        path: 'usuarios', component: UsuariosComponent
    },
    {
        path: 'usuarios/usuarios-add/:id', component: FormUsuariosComponent
    },
    {
        path: 'rally/rally-add/:id', component: FormRallyComponent
    },
    {
        path: 'perfil', component:PerfilComponent
    }
];
