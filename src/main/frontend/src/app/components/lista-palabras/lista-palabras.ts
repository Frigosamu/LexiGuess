import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PalabraService } from '../../services/palabra.service';
import { Palabra } from '../../models/palabra';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-lista-palabras',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-palabras.html',
  styleUrl: './lista-palabras.css',
})

export class ListaPalabras {
  private palabraService = inject(PalabraService);

  palabras = signal<Palabra[]>([]);
  error = signal<string>('');
  buscar = signal('');
  categoria = signal('');
  
  isLoading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);

  showConfirmPopup = signal(false);
  palabraAEliminar: Palabra | null = null;

  constructor() {
    this.load();
  }

  private load() {
    this.palabraService.getPalabras().subscribe({
      next: (ls) => {
        const sorted = ls.slice().sort((a, b) => a.palabra.localeCompare(b.palabra, undefined, { sensitivity: 'base' }));
        this.palabras.set(sorted);
        this.currentPage.set(1);
      },
      error: () => this.error.set('No se pudieron cargar las palabras.')
    });
  }

  filtered = computed(() => {
    const q = this.buscar().trim().toLowerCase();
    const cat = this.categoria();
    return this.palabras().filter(p => {
      const matchesQ = !q || p.palabra.toLowerCase().includes(q) || (p.descripcion || '').toLowerCase().includes(q);
      const matchesCat = !cat || cat === '' || p.categoria === cat;
      return matchesQ && matchesCat;
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize()))
  );

  paginated = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filtered().slice(start, start + size);
  });

  goToPage(page: number) {
    const max = this.totalPages();
    this.currentPage.set(Math.min(Math.max(1, page), max));
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  previousPage() {
    this.goToPage(this.currentPage() - 1);
  }

  clearFilters() {
    this.buscar.set('');
    this.categoria.set('');
    this.currentPage.set(1);
  }

  abrirConfirmacion(palabra: Palabra) {
    this.palabraAEliminar = palabra;
    this.showConfirmPopup.set(true);
  }

  cerrarConfirmacion() {
    this.showConfirmPopup.set(false);
    this.palabraAEliminar = null;
  }

  confirmarEliminacion() {
    if (!this.palabraAEliminar) return;

    this.isLoading.set(true);
    const id = this.palabraAEliminar.idPalabra;

    this.palabraService.deletePalabra(id).subscribe({
      next: () => {
        this.palabras.update(palabras => palabras.filter(p => p.idPalabra !== id));
        this.currentPage.set(1);
        this.isLoading.set(false);
        this.cerrarConfirmacion();
      },
      error: (err) => {
        if (err.status === 404) {
          this.error.set('Palabra no encontrada.');
        } else if (err.status === 401) {
          this.error.set('No autorizado para eliminar esta palabra.');
        } else {
          this.error.set('Error al eliminar la palabra.');
        }
        this.isLoading.set(false);
        this.cerrarConfirmacion();
      }
    });
  }
}