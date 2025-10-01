import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, MeResponse } from './auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data?.['roles'] || [];

  return auth.checkSession().pipe(
    map((res: MeResponse) => {
      if (!res || !res.username) {
        router.navigate(['/login']);
        return false;
      }

      if (expectedRoles.length > 0) {
        const hasRole = (res.roles || []).some(r => expectedRoles.includes(r));
        if (!hasRole) {
          router.navigate(['/login']); 
          return false;
        }
      }

      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
