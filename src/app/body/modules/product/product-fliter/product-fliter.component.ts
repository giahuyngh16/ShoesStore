import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-fliter',
  templateUrl: './product-fliter.component.html',
  styleUrls: ['./product-fliter.component.scss']
})
export class ProductFliterComponent implements OnInit {
  @Output() sortProduct = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectSort() {
   this.sortProduct.emit();
  }
}
