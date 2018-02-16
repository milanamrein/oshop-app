import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router) {

    // we do this, because we don't have registration
    // because we are working with Google profiles, so
    // we always want to keep the user's data up-to-date
    auth.user$.subscribe(user => {
      // if the user is logged in
      if (user) {
        // update it's record
        // or create record if it is the first time
        userService.save(user);
        
        // getting returnUrl after login
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });

  }
}

