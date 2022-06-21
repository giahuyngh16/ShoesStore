import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-fliter',
  templateUrl: './product-fliter.component.html',
  styleUrls: ['./product-fliter.component.scss']
})
export class ProductFliterComponent implements OnInit {
  @Output() sortProduct = new EventEmitter();

  options = [
    { name: "Price Increase", value: 1 },
    { name: "Price Decrease", value: 2 }
  ]
  constructor() { }

  ngOnInit() {
  }

  onSelectSort(value :any) {
   this.sortProduct.emit(value);
  }
}
