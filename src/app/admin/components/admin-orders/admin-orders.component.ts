import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) { 
    this.orders$ = this.orderService
      .getOrders() // returns DB list
      .snapshotChanges() // gives access to key and value pairs
      .map(changes => {
        // getting the key of the DB record, and other values
        return changes.map<Order>(change => ({
          key: change.payload.key,
          ...change.payload.val()
        }));
      });
  }

  getDate(datePlaced: number) {
    return new Date(datePlaced).toLocaleDateString();
  }

}
