import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  username: string = '';
  contrasenia: string = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal('');
  user = toSignal(this.auth.user$, { initialValue: null });
  
  constructor() {}
  
  
  onSubmit() {
    if (!this.username || !this.contrasenia) {
      this.error.set('Por favor, complete todos los campos.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    this.auth.login(this.username, this.contrasenia)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: () => {
        this.router.navigate(['/partida']);
        console.log('Inicio de sesión exitoso para:', this.username);
      },
      error: (err) => {
        this.error.set('Error al iniciar sesión. Por favor, verifique sus credenciales.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });

  }
}
