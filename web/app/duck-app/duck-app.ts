import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'duck-app',
  template: `
    <md-toolbar>
       <span class="toolbar-title">Duck {{isSidenavOpen}}</span>
       <button md-icon-button (click)="isSidenavOpen = true">
          <md-icon class="md-24">menu</md-icon>
       </button>
    </md-toolbar>
    <router-outlet></router-outlet>
    <md-sidenav-layout>
       <md-sidenav [opened]="isSidenavOpen">
       </md-sidenav>
  `,
  styleUrls: ['duck-app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DuckApp {
  isSidenavOpen: boolean = false;

  constructor(public appState: AppState) {}

}
