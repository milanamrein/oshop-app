import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from './../admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './../admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './../admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './../admin/services/admin-auth-guard.service';
import { LoginComponent } from './../core/components/login/login.component';
import { UnauthGuard } from './../core/services/unauth-guard.service';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { CheckOutComponent } from './../shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from './../shopping/components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './../shopping/components/order-details/order-details.component';
import { OrderSuccessComponent } from './../shopping/components/order-success/order-success.component';
import { ProductsComponent } from './../shopping/components/products/products.component';
import { ShoppingCartComponent } from './../shopping/components/shopping-cart/shopping-cart.component';
import { OrderGuard } from './../shopping/services/order-guard.service';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },      
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard, OrderGuard] },
  
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
