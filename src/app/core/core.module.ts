import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthGuard } from './services/unauth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    LoginComponent,
    FooterComponent
  ],
  exports: [
    BsNavbarComponent,
    FooterComponent
  ],
  providers: [
    UnauthGuard
  ]
})
export class CoreModule { }
