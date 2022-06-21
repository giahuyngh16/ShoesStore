import { DISPLAY_DATE } from './../../../core/constants/common.const';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from "@angular/core";
import { IHistoryOrderInfor } from "../interfaces/order.interface";

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {

  DISPLAY_DATE = DISPLAY_DATE;
  historyOrders: IHistoryOrderInfor[];
  p: number;
  constructor(
    private _orderService: OrderService
  ) {

  }
  ngOnInit() {
   this._loadListHistoryOrders();
  }

  private _loadListHistoryOrders(){
    this._orderService.getHistoryOrders().subscribe(his => {
      this.historyOrders = his.data;
    })
  }
}
