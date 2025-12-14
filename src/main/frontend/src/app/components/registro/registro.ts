import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = '';
  email = '';
  contrasenia = '';

  private auth = inject(AuthService);

  errorMsg: string | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router) {}
   
  registrar() {
    if (!this.nombre || !this.email || !this.contrasenia) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const usuario: Partial<Usuario> = {
      nombre: this.nombre,
      contrasenia: this.contrasenia,
      fechaRegistro: new Date(),
      email: this.email,
      rol: 'usuario',
    };

    this.auth.register(usuario as Usuario).subscribe({
      next: () => {
        console.log('Usuario registrado con éxito');
        this.errorMsg = null;
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 400 || err.status === 500) {
          this.errorMsg = err.error.message || 'El nombre de usuario ya está en uso.';
        } else {
          this.errorMsg = 'Error inesperado. No se pudo conectar con el servidor.';
        }
      }
    })
  }
}
