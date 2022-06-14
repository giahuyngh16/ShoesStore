import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrandInforModel, TypeInforModel } from '../../interfaces/product-type.interface';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss']
})
export class ProductSidebarComponent implements OnInit {

  @Input() brandInfor: BrandInforModel;
  @Input() productTypes: TypeInforModel[];
  @Output() productTypeId = new EventEmitter<number>();

  productType: TypeInforModel;
  // productTypeId: number;
  constructor() { }

  ngOnInit(): void {
  }

  onSelectProductType(value :number) {
    this.productTypeId.emit(value)

  }

}
