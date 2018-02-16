import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Gets all the categories sorted alphabetically
   * by the name property
   */
  getAll() {
    return this.db.list<Category>('/categories', ref => ref.orderByChild('name'));
  }

}
