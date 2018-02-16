import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Checks if the user is logged in
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.user$.map(user => {
      if (user) return true;

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    });
  }

}
