import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  // the application user field
  appUser: AppUser;

  // the client's shopping cart
  cart$: Observable<ShoppingCart>;

  isAriaExpanded: boolean = false;
  togglerClass: string = 'navbar-toggler collapsed';
  menuClass: string = 'collapse navbar-collapse';

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private router: Router) {}

  async ngOnInit() {
    // getting application user
    this.auth.AppUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
  }

  /**
   * The method of Log out
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // toggles the navigation icon button
  toggleNavbarIcon() {
    this.isAriaExpanded = !this.isAriaExpanded;
    this.togglerClass = (this.isAriaExpanded) 
      ? 'navbar-toggler' : 'navbar-toggler collapsed';
    this.menuClass = (this.isAriaExpanded)
      ? 'collapse navbar-collapse show' : 'collapse navbar-collapse';
  }

}
