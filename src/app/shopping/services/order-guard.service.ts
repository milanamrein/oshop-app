import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../shared/services/auth.service';
import { OrderService } from './../../shared/services/order.service';

@Injectable()
export class OrderGuard implements CanActivate {

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Observable<boolean> | Promise<boolean> {
      return this.orderService.getOrder(route.paramMap.get('id'))
        .valueChanges()
        .switchMap(order => {
          return this.authService.AppUser$.switchMap(appUser => {            
            return this.authService.user$.map(user => {
              if (appUser.isAdmin)
                return true;

              if (user.uid === order.userId)
                return true;

              this.router.navigate(['/']);
              return false;
            });
          });
        });
  }

}
