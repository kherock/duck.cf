import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DuckAPI {
  constructor(private http: Http) {}

  get(route: string) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return this.http.get(route, { headers });
  }
}