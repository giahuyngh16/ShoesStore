import { Categories } from '../categories.model';
import { Component, OnInit, Input } from '@angular/core';
import { IBrand } from '../brand.interface';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {

  @Input() brand: IBrand;

  constructor() { }

  ngOnInit(): void {
  }

}
