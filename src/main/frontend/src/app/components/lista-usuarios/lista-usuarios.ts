import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private usuarioService = inject(UsuarioService);

  usuarios = signal<Usuario[]>([]);
  error = signal<string>('');
  buscar = signal('');
  
  isLoading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);

  showConfirmPopup = signal(false);
  usuarioAEliminar: Usuario | null = null;

  constructor() {
    this.load();
  }

  private load() {
    this.usuarioService.getUsuarios().subscribe({
      next: (ls) => {
        const sorted = ls.slice().sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' }));
        this.usuarios.set(sorted);
        this.currentPage.set(1);
      },
      error: () => this.error.set('No se pudieron cargar los usuarios.')
    });
  }

  filtered = computed(() => {
    const q = this.buscar().trim().toLowerCase();
    return this.usuarios().filter(u => {
      const matchesQ = !q || u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      return matchesQ;
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
    this.currentPage.set(1);
  }

  abrirConfirmacion(usuario: Usuario) {
    this.usuarioAEliminar = usuario;
    this.showConfirmPopup.set(true);
  }

  cerrarConfirmacion() {
    this.showConfirmPopup.set(false);
    this.usuarioAEliminar = null;
  }

  confirmarEliminacion() {
    if (!this.usuarioAEliminar) return;

    this.isLoading.set(true);
    const id = this.usuarioAEliminar.idUsuario;

    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.usuarios.update(usuarios => usuarios.filter(u => u.idUsuario !== id));
        this.currentPage.set(1);
        this.isLoading.set(false);
        this.cerrarConfirmacion();
      },
      error: (err) => {
        if (err.status === 404) {
          this.error.set('Usuario no encontrado.');
        } else if (err.status === 401) {
          this.error.set('No autorizado para eliminar este usuario.');
        } else {
          this.error.set('Error al eliminar el usuario.');
        }
        this.isLoading.set(false);
        this.cerrarConfirmacion();
      }
    });
  }
}