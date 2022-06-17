import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CartService {

  reloadCart$ = new Subject<void>();
  totalMoneyCart$ = new Subject<void>();

  public reloadProductInCart() {
    this.reloadCart$.next();
  }

  public reloadToTalMoney() {
    this.totalMoneyCart$.next();
  }

}
