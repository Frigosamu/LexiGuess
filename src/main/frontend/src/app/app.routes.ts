import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Usuario } from './components/usuario/usuario';
import { Partida } from './components/partida/partida';
import { Registro } from './components/registro/registro';
import { UsuarioLogroComponent } from './components/usuario-logro.component/usuario-logro.component';
import { adminGuard } from './guards/admin-guard';
import e from 'express';
import { editUsuarioGuard } from './guards/edit-usuario-guard';


export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'partida', component: Partida },
    { path: 'usuario', component: Usuario },
    { path: 'registro', component: Registro },
    { path: 'usuarios/logros', component: UsuarioLogroComponent },
    { 
        path: 'new-palabra', 
        loadComponent: () => import('./components/palabra-nueva/palabra-nueva')
        .then(m => m.PalabraNueva),
        canActivate: [adminGuard]
    },
    {
        path: 'lista-palabras',
        loadComponent: () => import('./components/lista-palabras/lista-palabras')
        .then(m => m.ListaPalabras),
        canActivate: [adminGuard]
    },
    {
        path: 'editar-palabra',
        loadComponent: () => import('./components/editar-palabra/editar-palabra')
        .then(m => m.EditarPalabra),
        canActivate: [adminGuard]
    },
    {
        path: 'lista-usuarios',
        loadComponent: () => import('./components/lista-usuarios/lista-usuarios')
        .then(m => m.ListaUsuarios),
        canActivate: [adminGuard]
    },
    {
        path: 'editar-usuario',
        loadComponent: () => import('./components/editar-usuario/editar-usuario')
        .then(m => m.EditarUsuario),
        canActivate: [editUsuarioGuard]
    },
    { path: '**', redirectTo: '' }
];
