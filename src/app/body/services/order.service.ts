import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponse } from "src/app/core/interfaces/response.interface";
import { BaseService } from "src/app/core/services/base.service";
import { ORDER_API_PATH } from "../constants/order-api-path.const";
import { IHistoryOrderInfor } from "../modules/interfaces/order.interface";

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {

  getHistoryOrders(): Observable<IResponse<IHistoryOrderInfor[]>> {
    return this.requestWithLoading().get(`${ORDER_API_PATH.HIS_ORDER_API}`);
  }
}
