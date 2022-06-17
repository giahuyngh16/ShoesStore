import { CartService } from './../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartModel } from '../interfaces/cart.interface';
import { startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,OnDestroy {

  productCarts: CartModel[];
  totalMoney: number = 0;
  destroy$ = new Subject<void>();
  constructor(private _cartService: CartService) { }

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
      alert('test');
    }
    this.getCart();
  }

  private updateCart(){
    const cartJson = JSON.stringify(this.productCarts);
    window.sessionStorage.setItem('cart', cartJson);
    this._cartService.reloadCart$.next();

  }
}
