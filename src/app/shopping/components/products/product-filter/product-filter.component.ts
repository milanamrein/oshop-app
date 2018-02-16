import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../../../../shared/services/category.service';
import { Category } from './../../../../shared/models/category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  // the list of categories
  categories$: Observable<Category[]>;

  // input property to get the selected
  // category from ProductsComponent
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService
      .getAll()
      .snapshotChanges() // gives access to key and value pairs
      .map(changes => {
        // getting the key of the DB record, and other values
        return changes.map<Category>(change => ({
          key: change.payload.key,
          ...change.payload.val()
        }));
      });
  }

  ngOnInit() {
  }

}
