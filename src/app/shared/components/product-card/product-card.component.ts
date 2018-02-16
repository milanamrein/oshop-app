import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // input property to get the product
  @Input('product') product: Product;

  // input property which indicates whether
  // the buttons should be shown or not
  @Input('show-actions') showActions = true;

  // The client's shopping cart input property
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  /**
   * Adds a product to the shopping cart
   */
  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
