import { Component } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'duck-app',
  template: `
    <h1>Ducks are so cool</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['duck-app.scss']
})
export class DuckApp {
  constructor(public appState: AppState) {}
}