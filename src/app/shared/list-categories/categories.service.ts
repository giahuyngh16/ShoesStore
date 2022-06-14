import { IBrand } from './brand.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilterResponse } from 'src/app/core/interfaces/filter-response.interface';
import { IResponse } from 'src/app/core/interfaces/response.interface';
import { BaseService } from 'src/app/core/services/base.service';
import { Categories } from './categories.model';
import { BRAND_API_PATH } from './constants/brand-api-path.const';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  private categories: Categories[] = [
    new Categories('1', 'Nike'),
    new Categories('2', 'Adidas'),
    new Categories('3', 'Puma'),
    new Categories('4', 'New Balance'),
    new Categories('5', 'Bitis Hunter'),
  ];
  constructor(injector: Injector) {
    super(injector);
  }

  getBrands(): Observable<IResponse<IBrand[]>> {
    return this.requestWithLoading().get(`${BRAND_API_PATH.ROOT}`);
  }
}
