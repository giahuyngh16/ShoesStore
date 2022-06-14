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

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._loadListProductPopular();
  }

  private _loadListProductPopular() {
    this._productService.getPopularProducts().subscribe(product => {
      this.popularProductList = product.data;
    })
  }

}
