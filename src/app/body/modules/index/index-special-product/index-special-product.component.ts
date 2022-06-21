import { Router } from '@angular/router';
import { LoadingService } from './../../../../core/services/loading.service';
import { ProductService } from './../../../services/product.service';
import { IProductDetail } from './../../interfaces/product-detail.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-special-product',
  templateUrl: './index-special-product.component.html',
  styleUrls: ['./index-special-product.component.scss']
})
export class IndexSpecialProductComponent implements OnInit {
  popularProductList: IProductDetail[];

  showImage: boolean;

  constructor(
    private _productService: ProductService,
    private _loadingService: LoadingService,
    private _router: Router,
  ) {
    this.showImage = false;
   }

  ngOnInit() {
    this._loadListProductPopular();
  }

  navigateToDetail(id) {
    this._loadingService.showLoading1();
    this._router.navigate([`/details/${id}`]);
  }

  private _loadListProductPopular() {
    this._productService.getPopularProducts().subscribe(product => {
      this.popularProductList = product.data;
    })
  }



}
