import { CheckoutSuccessComponent } from './body/modules/checkout-success/checkout-success.component';
import { HistoryOrderComponent } from './body/modules/history-order/history-order.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from './body/modules/about-us/about-us.component';
import { CartComponent } from './body/modules/cart/cart.component';
import { ErrorComponent } from './body/modules/error/error.component';
import { IndexComponent } from './body/modules/index/index.component';
import { ProductComponent } from './body/modules/product/product.component';
import { ServiceComponent } from './body/modules/service/service.component';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RegisterComponent } from './user/register/register.component';
import { CheckoutCartInforComponent } from './body/modules/checkout-cart-infor/checkout-cart-infor.component';
import { ProductDetailsComponent } from './body/modules/product/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: WrapperComponent, children: [
    { path: 'home', component: IndexComponent },
    { path: 'all-products/:brandId', component: ProductComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'all-services', component: ServiceComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout-cart', component: CheckoutCartInforComponent },
    { path: 'history-order', component: HistoryOrderComponent },
    { path: 'checkout-success', component: CheckoutSuccessComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
