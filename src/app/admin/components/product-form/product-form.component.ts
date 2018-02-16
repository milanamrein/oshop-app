import { Product } from './../../../shared/models/product';
import { Category } from './../../../shared/models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
// takes one item from the observable, and then the observable
// automatically completes, so there's no need to manually unsubscribe
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  // list of categories observable
  categories$;

  // the product
  product = new Product();

  // the editable product's ID
  productId;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService
      .getAll()
      .snapshotChanges()
      .map(changes => {
        return changes.map<Category>(change => ({
          key: change.payload.key,
          ...change.payload.val()
        }));
      });

    // getting the product ID from the url
    this.productId = this.route.snapshot.paramMap.get('id');
    // if there is an ID, then we are in edit mode
    // otherwise we are in add mode
    if (this.productId)
      this.productService.get(this.productId)
        .valueChanges()
        .subscribe(product => this.product = product);
  }

  /**
   * Saves a product to the database
   * @param product - The product to save
   */
  save(product) {
    // if we have a product ID, then we are in edit mode
    // so we want to update the product
    // otherwise create it
    if (this.productId)
      this.productService.update(this.productId, product);
    else
      this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.productId);
      this.router.navigate(['/admin/products']);
    }
  }

}
