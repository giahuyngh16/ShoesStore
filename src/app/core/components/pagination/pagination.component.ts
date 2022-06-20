import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PagingModel } from "src/app/body/models/paging.model";
import { OPTION_PAGE} from "../../constants/common.const";
import * as _ from 'lodash';
import { ProductPagingViewModel } from "src/app/body/modules/interfaces/product-type.interface";
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() id: string;
  @Input() model: PagingModel;
  @Input()
  set data(value: ProductPagingViewModel) {
    this._data = this._initData(value);
  }
  get data() {
    return this._data;
  }

  @Output() dataModelChangeEvent = new EventEmitter();

  private _data: ProductPagingViewModel;

  OPTION_PAGE = OPTION_PAGE;

  constructor() { }

  ngOnInit() {
    //console.log(this._data)
   }

  get minItem() {
    if (this.data && this.data.productsInfor && this.data.productsInfor.length === 0) {
      return this.model.currentPage > 1
        ? (this.model.currentPage - 1) * this.model.itemsPerPage + 1
        : 0;
    } else {
      return this.model.currentPage > 1
        ? (this.model.currentPage - 1) * this.model.itemsPerPage + 1
        : 1;
    }
  }

  get maxItem() {
    const result = Number(this.minItem) + Number(this.model.itemsPerPage) - 1;
    const total = this.model.totalItems || this.data.amountProduct || this.data.productsInfor.length;
    return result >= total ? total : result;
  }

  onChangeCurrentPage(value) {
    this.model.currentPage = value;
    this.model.skip = value > 1 ? (value - 1) * this.model.itemsPerPage : 0;
    this.dataModelChangeEvent.emit(this.model);
  }

  changeSelectPerPage(value) {
    this.model.itemsPerPage = value;
    this.model.skip =
      this.model.currentPage > 1 ? (this.model.currentPage - 1) * value : 0;
    this.dataModelChangeEvent.emit(this.model);
  }

  private _initData(value: ProductPagingViewModel) {
    const valueClone: ProductPagingViewModel = _.cloneDeep(value);

    valueClone.amountProduct = valueClone && valueClone.amountProduct ? valueClone.amountProduct : valueClone.productsInfor ? valueClone.productsInfor.length : 0;

    return valueClone;
  }
}
