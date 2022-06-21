import { CategoriesService } from './../../shared/list-categories/categories.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { CartService } from './../../body/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartModel } from 'src/app/body/modules/interfaces/cart.interface';
import { startWith, Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit, OnDestroy {

  productCarts: CartModel[];
  totalProductInCart: number;
  reloadCartSubscription$: Subscription;
  destroy$ = new Subject<void>();

  brandList: any[];
  isProductlinkActive: boolean;

  constructor(private _cartService: CartService, private _router: Router, private _cateService: CategoriesService) { }

  ngOnInit(){
    this._cartService.reloadCart$.pipe(startWith(0), takeUntil(this.destroy$)).subscribe(() => {
      this.getCart();
    });

    this._cateService.getBrands().subscribe(brand => {
      this.brandList = brand.data;
    });

    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.isProductlinkActive = window.location.href.includes('all-products');
      };
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNavigateToProduct(){
    this._router.navigate([`all-products/${this.brandList[0].id}`]);
  }

  private getCart(){
    let product = window.sessionStorage.getItem('cart');
    if(product)
    {
      this.productCarts = JSON.parse(product);
      this.totalProductInCart = this.productCarts.length
    }
    else {
      this.totalProductInCart = 0;
    }
  }
}
