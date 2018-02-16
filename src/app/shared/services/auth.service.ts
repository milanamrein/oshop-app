import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';

// import everything from firebase, and give it the name 'firebase'
@Injectable()
export class AuthService {

  // The authenticated user
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    /**
     * getting the authenticated user observable
     * and we are going to unwrap this observable
     * using the async pipe in our template
     * IMPORTANT: when using firebase .subscribe()
     * we must always unsubscribe, and the async pipe
     * will do that for us
     */
    this.user$ = afAuth.authState;
  }

  /**
   * Application user property
   */
  get AppUser$() {
    return this.user$
      .switchMap(user => {
        if (user)
          return this.userService.get(user.uid)
            .snapshotChanges()
            .map(change => ({
              key: change.payload.key,
              ...change.payload.val()
            }));

        return Observable.of(null);
      });
  }

  /**
   * Google Authentication Login
   */
  login() {
    // storing returnUrl in local storage because
    // after Google's redirect we would lost it
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // this method redirects to the Google OAuth provider
    // and after it redirects back we get the returnUrl from localStorage
    // in AppComponent
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.router.navigate(['/']);
  }

  /**
   * The method of Log out
   */
  logout() {
    this.afAuth.auth.signOut();
  }
}
