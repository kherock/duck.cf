import { Component } from '@angular/core';
import { Api } from '../core/api';
import 'rxjs/add/operator/map';

@Component({
  selector: 'duck-ascii',
  template: `<pre>{{duckAscii$ | async}}</pre>`,
  styleUrls: ['duck-ascii.scss']
})
export class DuckAscii {
  duckAscii$ = this.duckAPI.get('').map((res: any) => res.ascii);

  constructor(private duckAPI: Api) { }
}