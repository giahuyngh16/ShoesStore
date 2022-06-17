import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs/internal/observable/timer';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';
import { MESSAGE } from '../constants/common.const';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private _DELAY_TIME = 800;
  private _TOAST_TIME_OUT = 2000;

  constructor(private _toastr: ToastrService) {}

  showToastrInfoMessage(message: any, title?: any, timeOut: number = this._TOAST_TIME_OUT) {
    this._toastr.info(message, title, {
      timeOut,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }
  showToastrWarningMessage(message: any, title?: any, timeOut: number = this._TOAST_TIME_OUT) {
    this._toastr.warning(message, title, {
      timeOut,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }
  showToastrSuccessMessage(message: any, title: string = MESSAGE.COMMON.SUCCESS, timeOut: number = this._TOAST_TIME_OUT) {
    this._toastr.success(message, title, {
      timeOut,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      enableHtml: true
    });
  }
  showToastrErrorMessage(message: any, title: string = MESSAGE.COMMON.ERROR, timeOut: number = this._TOAST_TIME_OUT) {
    this._toastr.error(message, title, {
      timeOut,
      closeButton: true,
      positionClass: 'toast-bottom-right'
    });
  }
  showToastrErrorMessageTOP(message: any, title: string = MESSAGE.COMMON.ERROR, timeOut: number = this._TOAST_TIME_OUT) {
    this._toastr.error(message, title, {
      timeOut,
      closeButton: true,
      positionClass: 'toast-top-center'
    });
  }
  showMultiError(messages: string, titleError = MESSAGE.COMMON.ERROR, delayTime = this._DELAY_TIME, timeOut: number = this._TOAST_TIME_OUT) {
    timer(0, delayTime).pipe(take(messages.length), map(index => messages[index])).subscribe(message => this.showToastrErrorMessage(message, titleError, timeOut));
  }
  showMultiSuccess(messages: string, titleError = MESSAGE.COMMON.SUCCESS, delayTime = this._DELAY_TIME) {
    timer(0, delayTime).pipe(take(messages.length), map(index => messages[index])).subscribe(message => this.showToastrSuccessMessage(message, titleError));
  }
}
