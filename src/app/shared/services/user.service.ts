import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
// import everything from firebase, and give it the name 'firebase'
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';


/**
 * Service to work with user objects
 * in Firebase Database
 */
@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Creates a user record in the database
   * @param user - The user to create
   */
  save(user: firebase.User) {
    // we are going to use the update method
    // because we only want to override their
    // changed properties, not the whole user record
    // what set would do
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });

  }

  /**
   * Gets a user from the
   * application database
   * @param uid - The user's ID
   */
  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

}
