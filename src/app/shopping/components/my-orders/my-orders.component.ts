import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
    this.orders$ = this.authService.user$
      .switchMap(user => 
        this.orderService.getOrdersByUser(user.uid)
        .snapshotChanges() // gives access to key and value pairs
        .map(changes => {
          // getting the key of the DB record, and other values
          return changes.map<Order>(change => ({
            key: change.payload.key,
            ...change.payload.val()
          }));
        })
      );
  }

}
