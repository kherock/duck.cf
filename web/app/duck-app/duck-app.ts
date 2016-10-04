import { Component } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'duck-app',
  template: `
    <md-sidenav-layout>
        <md-sidenav #sidenav>
            <md-nav-list (click)="sidenav.close()">
                <a md-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                    Home
                </a>
                <a md-list-item routerLink="/ascii" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                    ASCII ducks
                </a>
            </md-nav-list>
        </md-sidenav>
        <div class="app-layout">
            <md-toolbar color="primary">
                <span class="toolbar-title">Duck</span>
                <button md-icon-button (click)="sidenav.open()">
                    <md-icon class="md-24">menu</md-icon>
                </button>
            </md-toolbar>
            <router-outlet></router-outlet>
        </div>
    </md-sidenav-layout>
  `,
  styleUrls: ['duck-app.scss']
})
export class DuckApp {
  constructor(public appState: AppState) {}
}
