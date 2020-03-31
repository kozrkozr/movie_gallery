import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuthorization(state);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuthorization(state);
  }

  private checkAuthorization(state: RouterStateSnapshot): Observable<boolean> {
    this.authService.redirectUrl = state.url;

    return this.authService.isAuthorized().pipe(
      tap(isAuthorized => {
        if (!isAuthorized) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
