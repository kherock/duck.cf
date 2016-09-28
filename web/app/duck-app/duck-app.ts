import { Component } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'duck-app',
  template: `
    <span>Duck</span>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['duck-app.scss']
})
export class DuckApp {
  constructor(public appState: AppState) {}
}