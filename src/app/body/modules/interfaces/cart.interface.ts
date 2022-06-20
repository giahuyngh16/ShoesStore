export interface CartModel {
  id: number;
  size: number;
  quantity: number;
  name: string;
  pic: string;
  priceUSD: number;
  priceVND: number;
  maxQuantity: number;
}

export interface OrderParamModel {
  productCheckoutModel: [{
    id: number;
    quantity: number;
  }],
  paymentMethod: number;
  address: string;
}
