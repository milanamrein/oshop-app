import { Order } from './../models/order';
import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  /**
   * Places an order in the database
   * @param order - the order to store
   */
  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  /**
   * Gets all the orders
   */
  getOrders() {
    return this.db.list<Order>('/orders');
  }

  /**
   * Gets an order
   * @param orderId - The order's ID
   */
  getOrder(orderId: string) {
    return this.db.object<Order>('/orders/' + orderId);
  }

  /**
   * Gets a user's orders
   * @param userId - The user's ID
   */
  getOrdersByUser(userId: string) {
    return this.db.list<Order>('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  }

}
