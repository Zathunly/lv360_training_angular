import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.checkSession().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) router.navigate(['/login']);
      return !!isLoggedIn;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
