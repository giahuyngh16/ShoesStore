import { NotifierService } from './../../../core/services/notifier.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISortOption } from '../../models/sort.interface';
import { ProductService } from '../../services/product.service';
import { BrandInforModel, IProductFilter, ProductInforModel, ProductPagingViewModel, TypeInforModel } from '../interfaces/product-type.interface';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { PagingModel } from '../../models/paging.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productsInfor: ProductInforModel[];
  brandInfor: BrandInforModel;
  productTypes: TypeInforModel[];
  amountProduct: number;
  brandId: number;
  pagingModel = new PagingModel();
  reset$ = new Subject<boolean>();
  productPagingViewModel = {} as ProductPagingViewModel;

  constructor(
    private _avtivatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _notifierService: NotifierService
  ) {

  }

  ngOnInit() {
   this._avtivatedRoute.params.subscribe(param => {
    this.brandId = param['brandId'];
    this.filter.brandId = this.brandId;
    this._loadListProductOfBrand();
   });
    this._avtivatedRoute.queryParams.subscribe(queryParams => {
      this.getValue( +queryParams['type']);
    })
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
      this.productTypes = response.data.typeOfBrand.typeInfors;
      this.pagingModel.totalItems = response.data.amountProduct;
      this.productPagingViewModel = {
        amountProduct: response.data.amountProduct,
        skip: response.data.skip,
        take: response.data.take,
        productsInfor: response.data.productsInfor,
      }
    });
    this._notifierService.showToastrSuccessMessage('Load data successfully');
  }

  getValue(productTypeId:number){
    this.filter.typeId = productTypeId;
    this._loadListProductOfBrand();
  }

  getValueSort(sortProduct: any) {
    if(sortProduct == 'Price Decrease')
    {
      this.filter.sortBy = 'price';
      this.filter.isDescending = true;
    }
    else if (sortProduct == 'Price Increase')
    {
      this.filter.sortBy = 'price';
      this.filter.isDescending = false;
    }
    this._loadListProductOfBrand();
  }
}
