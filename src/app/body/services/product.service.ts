import { IProductDetail, IProductDetailViewModel } from './../modules/interfaces/product-detail.interface';
import { BaseService } from 'src/app/core/services/base.service';
import { Injectable } from '@angular/core';
import { Product } from './../models/product.model';
import { IResponse } from 'src/app/core/interfaces/response.interface';
import { Observable } from 'rxjs';
import { PRODUCT_API_PATH } from '../constants/product-api-path.const';
import { IProductFilter, ProductsBrandPageViewModel } from '../modules/interfaces/product-type.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  private products: Product[] = [
    new Product(
      '1',
      'Nike Air Fource 1',
      2000000,
      '/assets/img/product/nike1.jfif'
    ),
    new Product(
      '2',
      'Nike Air Fource 2',
      2000000,
      '/assets/img/product/nike1.jfif'
    ),
    new Product(
      '3',
      'Nike Air Fource 3',
      2000000,
      '/assets/img/product/nike1.jfif'
    ),
    new Product(
      '4',
      'Nike Air Fource 4',
      2000000,
      '/assets/img/product/nike1.jfif'
    ),
    new Product(
      '5',
      'Nike Air Fource 5',
      2000000,
      '/assets/img/product/nike1.jfif'
    ),
  ];

  getPopularProducts(): Observable<IResponse<IProductDetail[]>> {
    return this.requestWithLoading().get(`${PRODUCT_API_PATH.POPULAR_PRODUCTS}`);
  }

  getDetailProduct(id: number): Observable<IResponse<IProductDetailViewModel>> {
    return this.requestWithLoading().get(`${PRODUCT_API_PATH.DETAIL_PRODUCT}?id=${id}`);
  }

  getProducts(params: IProductFilter): Observable<IResponse<ProductsBrandPageViewModel>> {
    return this.requestWithLoading().get(`${PRODUCT_API_PATH.PRODUCT_OF_BRAND}`, params);
  }

}
