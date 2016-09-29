import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class DuckAPI {
  constructor(private http: Http) {}

  get(route: string) {
    const headers = new Headers();
    headers.append('Accept', 'application/json,text/plain');
    return this.http.get(route, { headers });
  }
}