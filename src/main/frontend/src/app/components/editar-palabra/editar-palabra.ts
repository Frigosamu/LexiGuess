import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PalabraService } from '../../services/palabra.service';
import { Palabra } from '../../models/palabra';

@Component({
  selector: 'app-editar-palabra',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-palabra.html',
  styleUrl: './editar-palabra.css',
})

export class EditarPalabra implements OnInit {
  private palabraService = inject(PalabraService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  palabra = '';
  descripcion = '';
  categoria = '';
  errorMsg: string | null = null;
  isLoading = false;
  showPopup = false;
  palabraId: number | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.palabraId = +params['id'];
      if (this.palabraId) {
        this.cargarPalabra();
      } else {
        this.errorMsg = 'ID de palabra no válido.';
      }
    });
  }

  private cargarPalabra() {
    this.isLoading = true;
    this.palabraService.getPalabras().subscribe({
      next: (palabras) => {
        const p = palabras.find(x => x.idPalabra === this.palabraId);
        if (p) {
          this.palabra = p.palabra;
          this.descripcion = p.descripcion;
          this.categoria = p.categoria;
          this.isLoading = false;
          this.cdr.detectChanges();
        } else {
          this.errorMsg = 'Palabra no encontrada.';
          this.isLoading = false;
        }
      },
      error: () => {
        this.errorMsg = 'Error al cargar la palabra.';
        this.isLoading = false;
      }
    });
  }

  guardarCambios() {
    if (!this.palabra || !this.descripcion || !this.categoria) {
      this.errorMsg = 'Rellene todos los campos.';
      this.cdr.detectChanges();
      return;
    }

    if (this.palabra.length !== 5) {
      this.errorMsg = 'La palabra debe ser de 5 letras.';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.errorMsg = null;

    const palabraActualizada: Palabra = {
      idPalabra: this.palabraId!,
      palabra: this.palabra,
      descripcion: this.descripcion,
      categoria: this.categoria,
      tamanio: this.palabra.length,
    };

    this.palabraService.editarPalabra(this.palabraId!, palabraActualizada).subscribe({
      next: () => {
        this.showPopup = true;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMsg = err.error.message || 'Datos inválidos.';
          this.cdr.detectChanges();
        } else if (err.status === 404) {
          this.errorMsg = 'Palabra no encontrada.';
          this.cdr.detectChanges();
        } else if (err.status === 401) {
          this.errorMsg = 'No autorizado para editar esta palabra.';
          this.cdr.detectChanges();
        } else {
          this.errorMsg = 'Error al guardar los cambios.';
          this.cdr.detectChanges();
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cerrarPopup() {
    this.showPopup = false;
    this.router.navigate(['/lista-palabras']);
  }

  cancelar() {
    this.router.navigate(['/lista-palabras']);
  }
}