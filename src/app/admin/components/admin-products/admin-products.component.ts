import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // list of products array
  products: Product[];

  // the subscription
  subscription: Subscription;

  // the DataTable resource object
  tableResource: DataTableResource<Product>;

  // the list of products on a single DataTable page
  items: Product[] = [];

  // the total number of products in the DataTable
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .snapshotChanges() // gives access to key and value pairs
      .map(changes => {
        // getting the key of the DB record, and other values
        return changes.map<Product>(change => ({
          key: change.payload.key,
          ...change.payload.val()
        }));
      })
      .subscribe(products => {
        this.products = products;

        // initialize DataTable
        this.initializeTable(products);
      });
  }

  ngOnInit() {
  }

  /**
   * Initializes DataTable
   * @param products - The list of products
   */
  private initializeTable(products: Product[]) {
    // initialize DataTable resource
    this.tableResource = new DataTableResource(products);
    // getting the records for the first table page
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    // gets the total number of products in the DataTable
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  /**
   * Reloads the DataTable everytime the
   * table parameters change
   * @param params - The new parameters
   */
  reloadItems(params) {
    if (!this.tableResource) return;

    // reload items if the page is already initialized
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  /**
   * Filters the product search
   * @param query - The searched product
   */
  filter(query: string) {
    // filtering the products array only if there is
    // a query string
    let filteredProducts = (query) ?
      this.products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    // setting these filtered products as the
    // resource of the DataTable
    this.initializeTable(filteredProducts);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
