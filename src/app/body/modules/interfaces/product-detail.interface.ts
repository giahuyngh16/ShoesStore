import { BrandInforModel } from "./product-type.interface";

export interface IProductDetail {
  id: number;
  name: string;
  isFavorite: boolean;
  priceUSD: number;
  priceVND: number;
  pic: string;
}

export interface IProductDetailViewModel {
  id: number;
  name: string;
  pic1: string;
  pic2: string;
  pic3: string;
  description: string;
  priceVND: number;
  priceUSD: number;
  brandInfor: BrandInforModel;
  status: number;
  baseProductInfors: BaseProductInfor[];
  reviewsDetail: ReviewDetailViewModel[];
}

export interface BaseProductInfor {
  id: number;
  quantity: number;
  productSize: number;
  size: number;
  isAvailable: boolean;
}

export interface ReviewDetailViewModel {
  idCustomer: number;
  idProductDetail: number;
  content: string;
  id: number;
  reviewTime: string;
  customerFullName: string;
}
