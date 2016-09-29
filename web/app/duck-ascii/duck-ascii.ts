import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { DuckAPI } from '../core/api';

@Component({
  selector: 'duck-ascii',
  template: `<pre>{{duckAscii | async}}</pre>`,
  styleUrls: ['duck-ascii.scss']
})
export class DuckAscii {
  duckAscii = this.duckAPI.get('/').map((res: Response) => res.json().ascii);

  constructor(private duckAPI: DuckAPI) {}
}