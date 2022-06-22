export interface IHistoryOrderInfor {
  id: number;
  orderDay: string;
  statusOrderatus: string;
  payment: string;
  extraFee: number;
  isPaid: boolean;
  address: string;
  totalPrice: number;
  extraFeeUSD: number;
}
