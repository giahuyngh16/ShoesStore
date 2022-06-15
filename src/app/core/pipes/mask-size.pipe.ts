import { Pipe, PipeTransform } from '@angular/core';

import { MaskPipe } from 'ngx-mask';

@Pipe({name: 'maskSize'})
export class MaskSizePipe implements PipeTransform {
  constructor(
    private _maskPipe: MaskPipe
  ) {}

  transform(value: string): any {
    if (value) {
      return value.replace('Size_', '');
    } else {
      return value;
    }
  }
}
