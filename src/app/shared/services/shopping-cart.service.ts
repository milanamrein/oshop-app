import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from './../models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Gets a cart from the database
   * @param cartId - the cart's Id
   */
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object<any>('/shopping-carts/' + cartId)
      .valueChanges()
      .map((cart) => new ShoppingCart(cart.items));
  }  

  /**
   * Adds a product to the shopping cart
   * @param product - the product to add
   */
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  /**
   * Removes a product from the shopping cart
   * @param product - the product to remove
   */
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  /**
   * Clears the shopping cart
   */
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  /**
   * Creates a shopping cart in the database
   * for a client
   */
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime() // just giving the time of creation as a bear minimum
    });
  }

  /**
   * Gets an item from a shopping cart
   * @param cartId - the cart which contains the item
   * @param productId - the item product
   */
  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  /**
   * Gets a cart's ID from the database
   * or creates a new cart if there is no
   * cart ID in local storage
   */
  private async getOrCreateCartId(): Promise<string> {
    // we store each client's shopping cart ID on the local storage
    let cartId = localStorage.getItem('cartId');

    // if there is no cart ID, create shopping cart for client
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

    return cartId;
  }  

  /**
   * Changes the quantity of a product
   * @param product - the product which quantity has to be changed
   * @param change - the number of quantity change
   */
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    // getting the item from the shopping cart
    let item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe((item: ShoppingCartItem) => {
      let quantity = (item) ? item.quantity + change : 0 + change;
      // if quantity is 0, remove item from cart
      if (quantity === 0)
        item$.remove();
      else
        item$.update({
          title: product.title, 
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
    });
  }
}
