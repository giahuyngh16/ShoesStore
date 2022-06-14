import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISortOption } from '../../models/sort.interface';
import { ProductService } from '../../services/product.service';
import { BrandInforModel, IProductFilter, ProductInforModel, TypeInforModel } from '../interfaces/product-type.interface';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productsInfor: ProductInforModel[];
  brandInfor: BrandInforModel;
  productTypes: TypeInforModel[];

  brandId: number;
  reset$ = new Subject<boolean>();

  constructor(
    private _avtivatedRoute: ActivatedRoute,
    private _productService: ProductService,
  ) { }

  ngOnInit() {
   this._avtivatedRoute.params.subscribe(param => {
    this.brandId = param['brandId'];
    this.filter.brandId = this.brandId;
    this._loadListProductOfBrand();
   });
  }

  ngOnDestroy() {
    this.reset$ && this.reset$.unsubscribe();
  }

  sortOption: ISortOption = {
    id: { sortBy: 'id', isDescending: true, isDefault: false },
    name: { sortBy: 'name', isDescending: false, isDefault: false },
    price:{ sortBy: 'price', isDescending: false, isDefault: false },
  };

  filter: IProductFilter = {
    terms: '',
    skip: 0,
    take: 10,
    total: 0,
    pageIndex: 1,
    isDescending: this.sortOption['id'].isDescending,
    sortBy: this.sortOption['id'].sortBy,
    brandId: null,
    typeId: null,
  };

  private _loadListProductOfBrand() {
    this._productService.getProducts(this.filter).subscribe(response => {
      this.productsInfor = response.data.productsInfor;
      this.brandInfor = response.data.typeOfBrand.brandInfor;
      this.productTypes =response.data.typeOfBrand.typeInfors;
      this.filter.total = response.data.amountProduct;
    });
  }
  getValue(productTypeId:number){
    this.filter.typeId = productTypeId;
    this._loadListProductOfBrand();
  }
}
