import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../shared/services/auth.service';

/**
 * Checks if the user is an admin
 */
@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.AppUser$.map(appUser => {
      if (appUser.isAdmin) return true;

      this.router.navigate(['/']);
      return false;
    });
  }

}
