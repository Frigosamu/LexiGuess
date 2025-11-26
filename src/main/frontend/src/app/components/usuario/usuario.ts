import { Component, inject, signal, effect } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario as UsuarioModel } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Partida } from '../../models/partida';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
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
}
