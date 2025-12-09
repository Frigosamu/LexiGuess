import { Component, inject, effect, signal } from '@angular/core';
import { UsuarioLogro } from '../../models/usuarioLogro';
import { UsuarioLogroService } from '../../services/usuario-logro.service';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario-logro.component',
  imports: [],
  templateUrl: './usuario-logro.component.html',
  styleUrl: './usuario-logro.component.css',
})
export class UsuarioLogroComponent {
  private auth = inject(AuthService);
  private usuarioLogroService = inject(UsuarioLogroService);

  user = toSignal(this.auth.user$, { initialValue: null });
  logros = signal<UsuarioLogro[]>([]);

  constructor() {
    effect(() => {
      const u = this.user();
      if (u) {
        this.usuarioLogroService.getLogrosPorUsuario(u.idUsuario)
          .subscribe(ls => this.logros.set(ls));
      }
    });
  }
}
