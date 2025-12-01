import { Component, inject, signal, effect, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario as UsuarioModel } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Partida } from '../../models/partida';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
  imports: [CommonModule],
})
export class Usuario {
  private auth = inject(AuthService);
  private usuarioService = inject(UsuarioService);

  user = signal<UsuarioModel | null>(null);
  partidas = signal<Partida[]>([]);

  constructor() {
    this.auth.user$.subscribe((u) => this.user.set(u));

    effect(() => {
      const usuarioId = this.user()?.idUsuario;
      if (usuarioId) {
        this.usuarioService.getPartidasPorUsuario(usuarioId).subscribe(
          (p) => this.partidas.set(p)
        );
      }
    });
  }

  currentPage = signal(1);
  pageSize = signal(5);

  totalPages = computed(() => {
    const total = this.partidas().length;
    const size = this.pageSize();

    return Math.max(1, Math.ceil(total / size));
  });

  paginatedPartidas = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;

    return this.partidas().slice(start, start + size);
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
}
