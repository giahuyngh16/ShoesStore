import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { IProductFilter, ProductInforModel } from '../../interfaces/product-type.interface';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements OnInit {
  //products: Product[];

  @Input() productsInfor: ProductInforModel[];

  constructor(
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    //this.products = this.productService['products'];
  }
}
