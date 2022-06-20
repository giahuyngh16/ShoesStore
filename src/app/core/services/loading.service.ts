import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  get loading(): Observable<boolean> {
    return this._isShowLoading$;
  }

  private _isShowLoading$ = new Subject<boolean>();
  private _isShowLoading = false;

  constructor() { }

  showLoading(): void {
    if (!this._isShowLoading) {
      this._isShowLoading = true;
      this._isShowLoading$.next(true);
    }
  }

  hideLoading(): void {
    setTimeout(() => {
      this._isShowLoading = false;
      this._isShowLoading$.next(false);
    }, 400);
  }

  clearLoading(): void {
    this._isShowLoading = false;
    this._isShowLoading$.next(false);
  }

  private readonly delayTime = 500;
  loadingUI$ = new BehaviorSubject<{ isShow: boolean, message: String }>({ isShow: false, message: null });

  private _loadingTimerId: any;

  showLoading1(message?: String) {
    if (!this.loadingUI$.value || !this.loadingUI$.value.isShow) {
      clearTimeout(this._loadingTimerId);
      this.loadingUI$.next({ isShow: true, message });
    }
  }

  hideLoading1() {
    if (this._loadingTimerId) {
      clearTimeout(this._loadingTimerId);
    }
    this._loadingTimerId = setTimeout(() => this.loadingUI$.next({ isShow: false, message: null }), this.delayTime);
  }
}
