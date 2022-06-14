import { Pipe, PipeTransform } from '@angular/core';

import { MaskPipe } from 'ngx-mask';
@Pipe({name: 'maskCurrency'})
export class MaskCurrencyPipe implements PipeTransform {
  constructor(
    private _maskPipe: MaskPipe
  ) {}

  transform(value: number): any {
    if (value) {
      return (value < 0 ? '-' : '') + `${this._maskPipe.transform(value, 'separator.2').toString()}₫`;
    } else {
      return '0₫';
    }
  }
}
