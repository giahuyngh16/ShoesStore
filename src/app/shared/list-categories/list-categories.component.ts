import { IBrand } from './brand.interface';
import { CategoriesService } from './categories.service';
import { Categories } from './categories.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  providers: [CategoriesService]
})
export class ListCategoriesComponent implements OnInit {

  categories: Categories[];

  brandList: IBrand[];

  constructor(private _cateService: CategoriesService) {}

  ngOnInit(): void {
    this.categories = this._cateService['categories'];
    this._loadListBrand();
  }

  private _loadListBrand(){
    this._cateService.getBrands().subscribe(brand => {
      this.brandList = brand.data;
    })
  }
}
