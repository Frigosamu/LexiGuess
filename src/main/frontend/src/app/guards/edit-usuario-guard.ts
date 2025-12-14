import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

export const editUsuarioGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const idParam = route.queryParams['id'] ? +route.queryParams['id'] : null;

  return auth.user$.pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/']);
        return false;
      }

      if (user.rol === 'admin') {
        return true;
      }

      if (idParam === user.idUsuario) {
        return true;
      }

      if (!idParam) {
        router.navigate(['/editar-usuario'], { queryParams: { id: user.idUsuario } });
        return false;
      }

      router.navigate(['/partida']);
      return false;
    })
  );
};