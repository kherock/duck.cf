import { Component } from '@angular/core';

@Component({
  selector: 'duck-app',
  template: `
    <span>Duck</span>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./duck-app.scss']
})
export class DuckApp {
}