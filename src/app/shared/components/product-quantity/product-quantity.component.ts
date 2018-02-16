import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  // input property to get the product
  @Input('product') product: Product;

  // The client's shopping cart input property
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  /**
   * Adds a product to the shopping cart
   */
  addToCart() {
    this.cartService.addToCart(this.product);
  }

  /**
   * Removes a product from the shopping cart
   */
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }      

}
