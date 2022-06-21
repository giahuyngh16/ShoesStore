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

export interface ProductCheckOutModel {
  id: number;
  quantity: number;
}
export interface OrderParamModel {
  productCheckOutModels: ProductCheckOutModel[];
  paymentMethod: number;
  address: string;
}
