import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { NotifierService } from "src/app/core/services/notifier.service";
import { CartModel } from "../interfaces/cart.interface";

@Component({
  selector: 'app-checkout-cart-modal',
  templateUrl: './checkout-cart-modal.component.html',
  styleUrls: ['./checkout-cart-modal.component.scss']
})
export class CheckoutCartModalComponent implements OnInit {

  productCarts: CartModel[];
  totalMoney: number;
  constructor(
    private _notifierService: NotifierService,
    private _bsModalRef: BsModalRef,
  ) { }
  ngOnInit() {
    //onsole.log(this.productCarts);
  }

}
