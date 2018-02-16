import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from './../../../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // the list of products
  products: Product[] = [];

  // list of products by a category
  filteredProducts: Product[] = [];

  // the selected category
  category: string;

  // the client's shopping cart
  cart$: Observable<any>;

  // the firebase subscription
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}

  // on initialization we get the client's shopping cart
  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  /**
   * Populates products
   */
  private populateProducts() {
    this.productService.getAll()
    .snapshotChanges()
    .map(changes => {
      // getting the key of the DB record, and other values
      return changes.map<Product>(change => ({
        key: change.payload.key,
        ...change.payload.val()
      }));
    })
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      // getting the selected category
      this.category = params.get('category');

      // setting the products of the selected category
      this.applyFilter();
    });
  }

  /**
   * Filters the products by category
   */
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(product => product.category === this.category) :
      this.products;
  }

}
