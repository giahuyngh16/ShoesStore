import { NotifierService } from './../../../core/services/notifier.service';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from "@angular/core";
import { CartModel, OrderParamModel } from "../interfaces/cart.interface";
import { startWith, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-cart-infor',
  templateUrl: './checkout-cart-infor.component.html',
  styleUrls: ['./checkout-cart-infor.component.scss']
})
export class CheckoutCartInforComponent implements OnInit {
  userCurrentProfile: IUser| null;

  productCarts: CartModel[];
  body: OrderParamModel;
  totalMoney: number = 0;
  destroy$ = new Subject<void>();
  informationForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notifierService: NotifierService,
  ) {
    this._authService.currentUser.subscribe((user: IUser| null) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit() {
    this._cartService.totalMoneyCart$.pipe(startWith(0), takeUntil(this.destroy$)).subscribe((value) => {
      this.getCart();
    });
    this.informationForm = this._buildForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
      paymentMethod: 1
    }
    this._cartService.checkOutCart(this.body).subscribe (
      () => {
        this._notifierService.showToastrSuccessMessage('Order Successfully');
        sessionStorage.removeItem('cart');
        this._cartService.reloadCart$.next();
        setTimeout( () => {this._router.navigate(['home'])}, 1000);
      },
      error => {
        this._notifierService.showToastrErrorMessage('Please try again','Order Fail');
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
    this.productCarts.forEach(item => {
      this.totalMoney += (item.priceUSD * item.quantity);
    });
  }

  private _buildForm(): FormGroup {
    return this._formBuilder.group({
      address: ['', [Validators.required]],
    });
  }
}
