import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { OrderParamModel } from '../modules/interfaces/cart.interface';
import { BaseService } from 'src/app/core/services/base.service';
import { CHECKOUT_API_PATH } from '../constants/checkout-cart-path.const';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseService {

  reloadCart$ = new Subject<void>();
  totalMoneyCart$ = new Subject<void>();

  public reloadProductInCart() {
    this.reloadCart$.next();
  }

  public reloadToTalMoney() {
    this.totalMoneyCart$.next();
  }

  checkOutCart(body: OrderParamModel) {
    return this.requestWithLoading().post(`${CHECKOUT_API_PATH.CHECK_OUT_API}`, body);
  }


}
