import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from './../../../core/services/notifier.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartModel } from '../interfaces/cart.interface';
import { startWith, Subject, takeUntil } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CheckoutCartModalComponent } from '../checkout-cart-modal/checkout-cart-modal.component';
import { IUser } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,OnDestroy {
  userCurrentProfile: IUser| null;

  productCarts: CartModel[];
  totalMoney: number = 0;
  destroy$ = new Subject<void>();
  constructor(private _cartService: CartService ,
    private _notifierService: NotifierService,
    private _modalService: BsModalService,
    private _router: Router,
    private _authService: AuthService) { }

  ngOnInit() {
    this._cartService.totalMoneyCart$.pipe(startWith(0), takeUntil(this.destroy$)).subscribe((value) => {
      this.getCart();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  onRemoveProduct(item: CartModel) {
    const itemIndex = this.productCarts.findIndex(product => product.id === item.id);

    if(item.quantity - 1 > 0) {
      const modifiedProduct = { ...item, quantity: item.quantity - 1 };
      this.productCarts.splice(itemIndex, 1, modifiedProduct);
    }else{
       this.productCarts = this.productCarts.filter(product => product.id !== item.id);
    }

    this.updateCart();
    this.getCart();
  }

  onAddProduct(item: CartModel) {
    if(item.quantity + 1 <= item.maxQuantity){
      const itemIndex = this.productCarts.findIndex(product => product.id === item.id);
      const modifiedProduct = { ...item, quantity: item.quantity + 1 };
      this.productCarts.splice(itemIndex, 1, modifiedProduct);
      this.updateCart();
    } else {
      this._notifierService.showToastrWarningMessage('Please check your cart','Item Instock')
    }
    this.getCart();
  }

  checkoutCart(productCarts: CartModel[]) {
    this._authService.currentUser.subscribe((user: IUser| null) => {
      this.userCurrentProfile = user
    });
    if(this.userCurrentProfile == null){
      this._router.navigate(['login']);
    }
    else{
      this._router.navigate(['checkout-cart']);
    }
  }

  private updateCart(){
    const cartJson = JSON.stringify(this.productCarts);
    window.sessionStorage.setItem('cart', cartJson);
    this._cartService.reloadCart$.next();

  }
}
