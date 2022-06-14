import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class BaseService {

    protected _baseApiHost: string = environment.apiHost;
    protected _httpClient: HttpClient;
    protected _loadingService: LoadingService;

    constructor(injector: Injector) {
        this._httpClient = injector.get(HttpClient);
        this._loadingService = injector.get(LoadingService);
    }

    requestWithLoading(): BaseService {
        this._loadingService.showLoading();
        return this;
    }

    get(path: string, params?: object): Observable<any> {
        return this._httpClient.get(`${this._baseApiHost}${path}`, { params: this._createRequestParams(params!) });
    }

    post(path: string, body: object, params?: object, options?: object): Observable<any> {
        return this._httpClient.post(`${this._baseApiHost}${path}`, body, {
            params: this._createRequestParams(params!),
            ...options
        });
    }

    put(path: string, body: object, params?: object): Observable<any> {
        return this._httpClient.put(`${this._baseApiHost}${path}`, body, { params: this._createRequestParams(params!) });
    }

    delete(path: string, params?: object): Observable<any> {
        return this._httpClient.delete(`${this._baseApiHost}${path}`, { params: this._createRequestParams(params!) });
    }

    private _createRequestParams(params: object): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (Array.isArray(params[key as keyof object])) {
                    (params[key as keyof object] as []).forEach((value: string) => {
                        if (value) {
                            value = value.toString().replace(/\//g, '%2F');
                            httpParams = httpParams.append(key.toString(), value);
                        }
                    });
                } else {
                    httpParams = params[key as keyof object] ? httpParams.append(key.toString(), params[key as keyof object]) : httpParams;
                }
            });
        }
        return httpParams;
    }
}
