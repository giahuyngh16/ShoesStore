import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { ProductService } from 'src/app/body/services/product.service';
import { BaseProductInfor, IProductDetailViewModel } from '../../interfaces/product-detail.interface';
import { BrandInforModel } from '../../interfaces/product-type.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetail: IProductDetailViewModel;
  brandInfor: BrandInforModel;
  sizeProductInfors: BaseProductInfor[];

  constructor(
    private _avtivatedRoute: ActivatedRoute,
    private _productService: ProductService,) { }

  ngOnInit() {
   this._avtivatedRoute.params.pipe(switchMap(param => this._productService.getDetailProduct(Number(param['id']))))
   .subscribe(product => {
     this.productDetail = product.data;
     this.brandInfor = product.data.brandInfor;
     this.sizeProductInfors = product.data.baseProductInfors;
   });
  }

}
