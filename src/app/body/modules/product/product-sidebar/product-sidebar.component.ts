import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { iif } from 'rxjs';
import { BrandInforModel, TypeInforModel } from '../../interfaces/product-type.interface';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss']
})
export class ProductSidebarComponent implements OnInit {
  productTypes: TypeInforModel[];

  @Input() brandInfor: BrandInforModel;
  @Input() set types(productTypes: TypeInforModel[]){
    if(productTypes){
      this.productTypes = [{id: 0, name: 'All'}, ...productTypes];
    }
  }

  @Output() productTypeId = new EventEmitter<number>();

  productType: TypeInforModel;
  selectedTypeId: number = 0;
  // productTypeId: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.selectedTypeId = queryParams['type'] ? +queryParams['type'] : 0;
    })
   }

  ngOnInit(): void {

  }

  onSelectProductType(value :number) {
    this.router.navigate([], {queryParams: {'type': value}});
  }

}
