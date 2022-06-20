import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { ProductInforModel } from '../../../interfaces/product-type.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: ProductInforModel;

  showImage: boolean;

  constructor(private productService: ProductService) {
    this.showImage = false;
  }

  showImg(hover: boolean) {
    setTimeout(() => {
      this.showImage = hover;
    }, 35);
  }

  ngOnInit(): void {
  }
}
