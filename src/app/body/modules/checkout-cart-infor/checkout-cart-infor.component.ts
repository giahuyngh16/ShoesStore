import { AuthService } from './../../../core/services/auth.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from "@angular/core";
import { CartModel, OrderParamModel } from "../interfaces/cart.interface";
import { startWith, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/user/interfaces/user.interface';

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
  constructor(
    private _authService: AuthService,
    private _cartService: CartService
  ) {
    this._authService.currentUser.subscribe((user: IUser| null) => {
      this.userCurrentProfile = user
    });
  }

  ngOnInit() {
    this._cartService.totalMoneyCart$.pipe(startWith(0), takeUntil(this.destroy$)).subscribe((value) => {
      this.getCart();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOrder() {

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
}
