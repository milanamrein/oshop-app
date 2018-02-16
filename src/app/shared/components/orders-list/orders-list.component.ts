import { Order } from '../../../shared/models/order';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {

  // the orders input property
  @Input('orders') orders: Order[];

  getDate(datePlaced: number) {
    return new Date(datePlaced).toLocaleDateString();
  }

}
