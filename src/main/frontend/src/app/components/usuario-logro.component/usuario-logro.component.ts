import { Component, inject, effect, signal, computed } from '@angular/core';
import { UsuarioLogro } from '../../models/usuarioLogro';
import { UsuarioLogroService } from '../../services/usuario-logro.service';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Usuario } from '../../models/usuario';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuario-logro.component',
  imports: [CommonModule],
  templateUrl: './usuario-logro.component.html',
  styleUrl: './usuario-logro.component.css',
  providers: [DatePipe]
})

export class UsuarioLogroComponent {
  private auth = inject(AuthService);
  private usuarioLogroService = inject(UsuarioLogroService);

  user = toSignal(this.auth.user$, { initialValue: null });
  logros = signal<UsuarioLogro[]>([]);
  error = signal<string>('');

  constructor() {
    effect(() => {
      const id = this.user()?.idUsuario;
      if (id) {
        this.usuarioLogroService.getLogrosPorUsuario(id).subscribe({
          next: (ls) => this.logros.set(ls),
          error: () => this.error.set('No se pudieron cargar los logros.')
        });
      }
    });
  }

  currentPage = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => {
    const total = this.logros().length;
    const size = this.pageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  paginatedLogros = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.logros().slice(start, start + size);
  });

  nextPage() { this.goToPage(this.currentPage() + 1); }
  previousPage() { this.goToPage(this.currentPage() - 1); }
  goToPage(page: number) {
    const max = this.totalPages();
    this.currentPage.set(Math.min(Math.max(1, page), max));
  }
}
