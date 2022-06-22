import { OrderService } from './body/services/order.service';
import { ToastContainerModule, ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderNavbarComponent } from './header/header-navbar/header-navbar.component';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { LogoComponent } from './shared/logo/logo.component';
import { CategoryItemComponent } from './shared/list-categories/category-item/category-item.component';
import { ServiceItemComponent } from './shared/list-services/service-item/service-item.component';
import { ListCategoriesComponent } from './shared/list-categories/list-categories.component';
import { ListServicesComponent } from './shared/list-services/list-services.component';

import { BodyComponent } from './body/body.component';
import { AboutUsComponent } from './body/modules/about-us/about-us.component';
import { IndexComponent } from './body/modules/index/index.component';
import { ProductComponent } from './body/modules/product/product.component';
import { CartComponent } from './body/modules/cart/cart.component';
import { ErrorComponent } from './body/modules/error/error.component';
import { ServiceComponent } from './body/modules/service/service.component';
import { IndexBannerComponent } from './body/modules/index/index-banner/index-banner.component';
import { IndexFounderComponent } from './body/modules/index/index-founder/index-founder.component';
import { IndexServiceComponent } from './body/modules/index/index-service/index-service.component';
import { IndexSpecialProductComponent } from './body/modules/index/index-special-product/index-special-product.component';
import { ServiceCleanComponent } from './body/modules/service/service-clean/service-clean.component';
import { ServiceRepairComponent } from './body/modules/service/service-repair/service-repair.component';
import { ProductFliterComponent } from './body/modules/product/product-fliter/product-fliter.component';
import { ProductSidebarComponent } from './body/modules/product/product-sidebar/product-sidebar.component';
import { ProductListItemComponent } from './body/modules/product/product-list-item/product-list-item.component';
import { ProductItemComponent } from './body/modules/product/product-list-item/product-item/product-item.component';
import { ProductDetailsComponent } from './body/modules/product/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RedirectGuardService } from './core/services/redirect-guard.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './core/services/loading.service';
import { WrapperComponent } from './wrapper/wrapper.component';
import { MaskCurrencyPipe } from './core/pipes/mask-currency.pipe';
import { PaginationComponent } from './core/components/pagination/pagination.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MaskPipe, NgxMaskModule } from 'ngx-mask';
import { MaskSizePipe } from './core/pipes/mask-size.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './user/register/register.component';
import { NotifierService } from './core/services/notifier.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CheckoutCartModalComponent } from './body/modules/checkout-cart-modal/checkout-cart-modal.component'
import { CheckoutCartInforComponent } from './body/modules/checkout-cart-infor/checkout-cart-infor.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { BaseService } from './core/services/base.service';
import { httpInterceptorProviders } from './core/interceptors';
import { HistoryOrderComponent } from './body/modules/history-order/history-order.component';
import { FormatTimePipe } from './core/pipes/format-time.pipe';
import { CheckoutSuccessComponent } from './body/modules/checkout-success/checkout-success.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    AppComponent,
    MaskCurrencyPipe,
    FormatTimePipe,
    HeaderComponent,
    FooterComponent,
    HeaderNavbarComponent,
    HeaderMobileComponent,
    LogoComponent,
    CategoryItemComponent,
    ServiceItemComponent,
    ListServicesComponent,
    ListCategoriesComponent,
    BodyComponent,
    AboutUsComponent,
    IndexComponent,
    ProductComponent,
    CartComponent,
    ErrorComponent,
    ServiceComponent,
    IndexBannerComponent,
    IndexFounderComponent,
    IndexServiceComponent,
    IndexSpecialProductComponent,
    ServiceCleanComponent,
    ServiceRepairComponent,
    ProductFliterComponent,
    ProductSidebarComponent,
    ProductListItemComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    LoginComponent,
    WrapperComponent,
    PaginationComponent,
    MaskSizePipe,
    RegisterComponent,
    CheckoutCartModalComponent,
    CheckoutCartInforComponent,
    ForgotPasswordComponent,
    HistoryOrderComponent,
    CheckoutSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxPaginationModule,
    ToastContainerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 1000,
      easeTime: 500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      tapToDismiss: true,
      maxOpened: 0
    }),
    NgxMaskModule.forRoot({
      thousandSeparator: ',',
      specialCharacters: [',']
    }),
    ModalModule.forRoot(),
  ],
  providers: [
    RedirectGuardService,
    AuthGuardService,
    AuthService,
    LoadingService,
    MaskCurrencyPipe,
    MaskSizePipe,
    MaskPipe,
    NotifierService,
    ToastrService,
    FormatTimePipe,
    BaseService,
    ...httpInterceptorProviders,
    OrderService
    ],
    entryComponents: [
      CheckoutCartModalComponent
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
