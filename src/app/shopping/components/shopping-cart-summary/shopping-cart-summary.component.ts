import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  // the shopping cart input property
  @Input('cart') cart: ShoppingCart;
}
