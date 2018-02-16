import { AuthService } from './../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnDestroy {

  // the order
  order: Order = {
    datePlaced: null,
    items: [],
    shipping: {},
    userId: null
  };

  // Disposable subscription
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    orderService: OrderService) { 
    this.subscription = orderService
      .getOrder(route.snapshot.paramMap.get('id'))
      .valueChanges()
      .subscribe(order => this.order = order);
  }

  getDate(datePlaced: number) {
    return new Date(datePlaced).toLocaleDateString();
  }

  totalPrice() {
    let sum = 0;
    this.order.items.forEach(item => {
      sum += item.totalPrice * item.quantity;
    });

    return sum;
  }

  totalItemsCount() {
    let count = 0;
    this.order.items.forEach(item => {
      count += item.quantity;
    });
        
    return count;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
