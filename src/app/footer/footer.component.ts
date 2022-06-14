import { CategoriesService } from '../shared/list-categories/categories.service';
import { ServiesService } from '../shared/list-services/services.service';
import { Categories } from '../shared/list-categories/categories.model';
import { Services } from '../shared/list-services/services.model';
import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/list-categories/brand.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [CategoriesService, ServiesService],
})
export class FooterComponent implements OnInit {
  categories: Categories[];
  services: Services[];

  brandList: IBrand[];

  constructor(
    private cateService: CategoriesService,
    private serService: ServiesService,
    ) {}

  ngOnInit(): void {
    this.categories = this.cateService['categories'];
    this.services = this.serService['_services'];
    this._loadListBrand();
  }

  private _loadListBrand(){
    this.cateService.getBrands().subscribe(brand => {
      this.brandList = brand.data;
    })
  }
}
