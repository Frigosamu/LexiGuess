import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PalabraService } from '../../services/palabra.service';
import { Router } from '@angular/router';
import { Palabra } from '../../models/palabra';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-palabra-nueva',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './palabra-nueva.html',
  styleUrl: './palabra-nueva.css',
})
export class PalabraNueva {
  private auth = inject(AuthService);

  user = toSignal<Usuario | null>(this.auth.user$, { initialValue: null });

  palabra = '';
  descripcion = '';
  categoria = '';

  private palabraService = inject(PalabraService);

  showPopup = false;
  errorMsg: string | null = null;
  isLoading = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  aniadirPalabra() {
    if (!this.palabra || !this.descripcion || !this.categoria) {
      this.errorMsg = 'Rellene todos los campos.';
      return;
    }

    if (this.palabra.length !== 5) {
      this.errorMsg = 'La palabra introducida debe ser de 5 letras.';
      return;
    }

    this.isLoading = true;
    this.errorMsg = null;
    this.cdr.detectChanges();


    const palabra: Partial<Palabra> = {
      palabra: this.palabra,
      descripcion: this.descripcion,
      categoria: this.categoria,
    };

    this.palabraService.createPalabra(palabra as Palabra)
      .subscribe({
        next: () => {
          console.log('Palabra aniadida con exito');
          this.palabra = '';
          this.descripcion = '';
          this.categoria = '';

          this.showPopup = true;
          this.isLoading = false;
          this.cdr.detectChanges();

        },
        error: (err) => {
          console.log('Error status:', err.status);
          if (err.status === 401) {
            this.errorMsg = 'No autorizado. La palabra ya existe.';
            this.cdr.detectChanges();
          } else if (err.status === 400) {
            this.errorMsg = err.error.message || 'Datos inválidos.';
            this.cdr.detectChanges();
          } else if (err.status === 500) {
            this.errorMsg = 'Error del servidor. Intenta más tarde.';
            this.cdr.detectChanges();
          } else {
            this.errorMsg = 'Error inesperado. No se pudo conectar con el servidor.';
            this.cdr.detectChanges();
          }
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  cerrarPopup() {
    this.showPopup = false;
  }
}
