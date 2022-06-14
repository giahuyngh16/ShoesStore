import { PaginationModel } from "../../models/pagination-model";

export interface ProductsBrandPageViewModel {
  amountProduct: number;
  typeOfBrand: TypeOfBrandInforModel;
  productsInfor: ProductInforModel[];
}

export interface TypeOfBrandInforModel {
  brandInfor: BrandInforModel;
  typeInfors: TypeInforModel[];
}

export interface BrandInforModel {
  id: number;
  name: string;
}

export interface TypeInforModel {
  id: number;
  name: string;
}

export interface ProductInforModel {
  id: number;
  brandId: number;
  name: string;
  priceVND: number;
  priceUSD: number;
  pic: string;
}

export interface IProductFilter extends PaginationModel{
  brandId: number;
  typeId?: number;
  sortBy: string;
  isDescending: boolean;
  terms: string;
}
