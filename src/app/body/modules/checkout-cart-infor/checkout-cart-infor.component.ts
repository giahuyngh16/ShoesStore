import { NotifierService } from './../../../core/services/notifier.service';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from "@angular/core";
import { CartModel, OrderParamModel } from "../interfaces/cart.interface";
import { startWith, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PayPalEnvironment, PayPalIntegrationType } from 'src/app/core/constants/common.const';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-checkout-cart-infor',
  templateUrl: './checkout-cart-infor.component.html',
  styleUrls: ['./checkout-cart-infor.component.scss']
})
export class CheckoutCartInforComponent implements OnInit {
  userCurrentProfile: IUser | null;

  productCarts: CartModel[];
  body: OrderParamModel;
  totalMoney: number = 0;
  destroy$ = new Subject<void>();
  informationForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  public payPalConfig?: IPayPalConfig;

  paymentMethods = [
    { name: "Ship Cod", value: 1 },
    { name: "E Wallet", value: 2 },
    { name: "Bank Transfer", value: 3 }
  ]

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
  ) {
    this._authService.currentUser.subscribe((user: IUser | null) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit() {
    this._cartService.totalMoneyCart$.pipe(startWith(0), takeUntil(this.destroy$)).subscribe((value) => {
      this.getCart();
    });
    this.informationForm = this._buildForm();
    this.initConfig();
    console.log(this.userCurrentProfile)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AY-kA2s-yKYMAWrOMy0jeYspQ_fxEokHHiwsxHX9101LL-HzU0qClKPfypBed1IU4IzmHzo3TIAKm54w',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',

        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalMoney.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalMoney.toString()
              }
            }
          },
          items: this.productCarts.map(product => {
            return {
              name: product.name,
              quantity: product.quantity.toString(),
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: product.priceUSD.toString(),
              },
            }
          }),
          // shipping: {
          //   address: this.informationForm.value.address,
          // },
        },
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.body = {
          productCheckOutModels: this.productCarts.map(product => {
            return {
              id: product.id,
              quantity: product.quantity,
            }
          }),
          address: this.informationForm.value.address,
          paymentMethod: 2,
          isPaid: true,
        }
        this._cartService.checkOutCart(this.body).subscribe(
          () => {
            this._notifierService.showToastrSuccessMessage('Order Successfully');
            window.sessionStorage.removeItem('cart');
            this._cartService.reloadProductInCart();
            this._router.navigate(['checkout-success'])
          },
          error => {
            this._notifierService.showToastrErrorMessage('Please try again', 'Order Fail');
            this.loading = false;
          }
        )
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        this._notifierService.showToastrErrorMessage('Please try again');
      },
      onClick: (data, actions) => {
      }
    };
  }

  get f() { return this.informationForm.controls; }

  onOrder() {
    this.submitted = true;
    if (this.informationForm.invalid) {
      this.informationForm.markAllAsTouched();
      return;
    }
    this.body = {
      productCheckOutModels: this.productCarts.map(product => {
        return {
          id: product.id,
          quantity: product.quantity,
        }
      }),
      address: this.informationForm.value.address,
      paymentMethod: 1,
      isPaid: false,
    }
    this._cartService.checkOutCart(this.body).subscribe(
      () => {
        this._notifierService.showToastrSuccessMessage('Order Successfully');
        window.sessionStorage.removeItem('cart');
        this._cartService.reloadProductInCart();
        this._router.navigate(['checkout-success'])
      },
      error => {
        this._notifierService.showToastrErrorMessage('Please try again', 'Order Fail');
        this.loading = false;
      }
    )
  }

  getCart() {
    let product = window.sessionStorage.getItem('cart');
    if (product) {
      this.productCarts = JSON.parse(product);
    }
    this.totalMoney = 0;
    if(this.productCarts) {
      this.productCarts.forEach(item => {
        this.totalMoney += (item.priceUSD * item.quantity);
      });
    }

  }

  private _buildForm(): FormGroup {
    return this._formBuilder.group({
      address: [this.userCurrentProfile.address, [Validators.required]],
    });
  }
}
