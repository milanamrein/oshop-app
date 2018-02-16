import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UnauthGuard {

  constructor(
    private auth: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.user$.map(user => {
      if (!user) return true;

      this.router.navigate(['/']);
      return false;
    });
  }

}
