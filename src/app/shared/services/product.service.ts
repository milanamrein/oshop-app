import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Gets all products
   */
  getAll() {
    return this.db.list<Product>('/products');
  }

  /**
   * Gets a product from the database
   * @param id - The product's ID
   */
  get(id) {
    return this.db.object<Product>('/products/' + id);
  }

  /**
   * Creates a new product
   * @param product - The product to create
   */
  create(product) {
    return this.db.list('/products').push(product);
  }

  /**
   * Updates a product in the database
   * @param productId - The product's ID
   * @param product - The product
   */
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  /**
   * Deletes a product from the database
   * @param productId - The product's ID
   */
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
