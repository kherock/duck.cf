import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const API_ROOT = '/';

@Injectable()
export class Api {
  constructor(public http: Http) { }

  _setHeaders() {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers(headersConfig);
  }


  _formatErrors(error: Response) {
    return Observable.throw(error instanceof Response ? Object.assign(new Error(), error.json()) : error);
  }

  get(path: string, paramsJson: any = {}) {
    const params = new URLSearchParams();
    for (const param in paramsJson) if (paramsJson[param] !== '') params.set(param, paramsJson[param]);
    return this.http.get(`${API_ROOT}${path}`, { headers: this._setHeaders(), params }).
        catch(this._formatErrors).
        map(res => res.json());
  }

  post(path: string, body: any = {}) {
    return this.http.post(`${API_ROOT}${path}`, JSON.stringify(body), { headers: this._setHeaders() }).
        catch(this._formatErrors).
        map(res => res.json());
  }

  put(path: string, body: any = {}) {
    return this.http.put(`${API_ROOT}${path}`, JSON.stringify(body), { headers: this._setHeaders() }).
        catch(this._formatErrors).
        map(res => res.json());
  }

  patch(path: string, body: any = {}) {
    return this.http.patch(`${API_ROOT}${path}`, JSON.stringify(body), { headers: this._setHeaders() }).
        catch(this._formatErrors).
        map(res => res.json());
  }

  delete(path: string) {
    return this.http.delete(`${API_ROOT}${path}`, { headers: this._setHeaders() }).
        catch(this._formatErrors).
        map(res => res.json());
  }
}