import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  // the created order's ID
  orderId: string;

  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
