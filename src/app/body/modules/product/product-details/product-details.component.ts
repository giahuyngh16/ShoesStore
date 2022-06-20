import { CartService } from './../../../services/cart.service';
import { NotifierService } from './../../../../core/services/notifier.service';
import { MaskApplierService, MaskPipe } from 'ngx-mask';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { ProductService } from 'src/app/body/services/product.service';
import { BaseProductInfor, IProductDetailViewModel } from '../../interfaces/product-detail.interface';
import { BrandInforModel } from '../../interfaces/product-type.interface';
import { CartModel } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetail: IProductDetailViewModel;
  brandInfor: BrandInforModel;
  sizeProductInfors: BaseProductInfor[];
  selectedSize: BaseProductInfor;
  selectedQuantity: number = 1;
  exceededQuantity = false;
  productToCart: CartModel;

  constructor(
    private _avtivatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _notifierService: NotifierService,
    private _cartService: CartService) { }

  ngOnInit() {
   this._avtivatedRoute.params.pipe(switchMap(param => this._productService.getDetailProduct(Number(param['id']))))
   .subscribe(product => {
     this.productDetail = product.data;
     this.brandInfor = product.data.brandInfor;
     this.sizeProductInfors = product.data.baseProductInfors;
   });
  }

  imgSelected(src) {
    let imgSelected = document.getElementById('defaultIMG') as HTMLImageElement;
    imgSelected.src = 'assets'+src;
  }

  onQuantityChange(event: Event): void {
    if( this.selectedQuantity > this.selectedSize.quantity){
      this.selectedQuantity = this.selectedSize.quantity;
    }
  }

  activeBtnSubmit() {
    let btn = document.getElementById("btnSubmit");
    btn.classList.add("activeBtnSubmit")
  }

  onSizeChange(size: BaseProductInfor): void {
    this.selectedSize = size;
    this.selectedQuantity = 1;
  }

  AddProductToCart() {
    if(!this.selectedSize){
      this._notifierService.showToastrWarningMessage('Please select size');
      return;
    }

    this.productToCart = {
      id: this.selectedSize.id,
      size: this.selectedSize.size,
      quantity: this.selectedQuantity,
      name: this.productDetail.name,
      pic: this.productDetail.pic1,
      priceUSD: this.productDetail.priceUSD,
      priceVND: this.productDetail.priceVND,
      maxQuantity: this.selectedSize.quantity
    }

    let cart = window.sessionStorage.getItem('cart');
    if(cart) {
      let productsInCart = JSON.parse(cart) as CartModel[];
      const product = productsInCart.find(product => product.id == this.productToCart.id) ?
       {...productsInCart.find(product => product.id == this.productToCart.id)} : undefined;


      const expectedQuantity = product ? product.quantity + this.productToCart.quantity : this.productToCart.quantity;
      if(!product){
        productsInCart.push(this.productToCart);
        cart = this.onAddProductToCartSucess(productsInCart);
      }
      else if(expectedQuantity <= this.productToCart.maxQuantity)
      {
        productsInCart = productsInCart.filter(product => product.id !== this.productToCart.id);
        product.quantity = expectedQuantity;
        productsInCart.push(product);
        cart = this.onAddProductToCartSucess(productsInCart);
      }
      else {
        this._notifierService.showToastrWarningMessage('Please check product your cart', 'Item instock !');
      }

    }else {
      cart = this.onAddProductToCartSucess([this.productToCart]);
    }

    window.sessionStorage.setItem('cart',cart);
    this._cartService.reloadProductInCart();
  }

  private onAddProductToCartSucess(productsInCart: CartModel[]): string{
    this._notifierService.showToastrSuccessMessage('Your product has been added to cart. Thank you for shopping with us!');
    return  JSON.stringify(productsInCart);
  }
}
