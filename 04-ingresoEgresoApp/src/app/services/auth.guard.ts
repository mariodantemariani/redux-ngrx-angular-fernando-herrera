import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

// export const AuthGuard = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isAuth().pipe(
//     tap((estado) => {
//       if (!estado) {
//         router.navigate(['/login']);
//       }
//     })
//   );
// };

const isAuthenticated = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuth().pipe(
    tap((estado) => {
      if (!estado) {
        router.navigate(['/login']);
      }
    }),
    take(1)
  );
};

export const canActivate: CanActivateFn = isAuthenticated;
export const canMatch: CanMatchFn = isAuthenticated;
