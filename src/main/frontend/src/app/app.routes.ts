import { Routes } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Inicio } from './components/inicio/inicio';
import { Usuario } from './components/usuario/usuario';
import { Partida } from './components/partida/partida';
import { Registro } from './components/registro/registro';


export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'partida', component: Partida },
    { path: 'usuario', component: Usuario },
    { path: 'registro', component: Registro },
    { path: '**', redirectTo: '' }
];
