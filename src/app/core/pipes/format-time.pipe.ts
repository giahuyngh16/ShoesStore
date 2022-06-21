import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DISPLAY_DATE } from '../constants/common.const';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: any, format = DISPLAY_DATE.LONG_DATE_UPPER_CASE, formatToClientTime = false): string {
    return value ? (formatToClientTime ? moment(clientTime(value)).format(format) : moment(value).format(format)) : '';
  }
}

function clientTime(utcTime: any): number {
  if (!utcTime) {
    return null;
  }
  if (typeof utcTime !== 'string') {
    utcTime = utcTime.toString();
  }
  if (!/z$|gmt$|utc$/i.test(utcTime)) {
    utcTime = utcTime.replace(/\s+$/, '') + 'Z';
  }
  const client = new Date(utcTime);
  return +client;
}
