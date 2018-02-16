import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from './../app-routing/app-routing.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // ng-bootstrap is an Angular powered Bootstrap
    // which replaces bootstrap.js
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersListComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrdersListComponent,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthGuard
  ]
})
export class SharedModule { }
