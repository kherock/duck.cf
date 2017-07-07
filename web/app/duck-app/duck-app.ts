import { Component } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'duck-app',
  template: `
    <md-sidenav-container>
        <md-sidenav #sidenav>
            <md-nav-list (click)="sidenav.close()">
                <a md-list-item
                    routerLink="/"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{exact: true}">
                    Home
                </a>
                <a md-list-item
                    routerLink="/ascii"
                    routerLinkActive="active">
                    ASCII ducks
                </a>
                <a md-list-item
                    routerLink="/duck-chat"
                    routerLinkActive="active">
                    Duck Chat
                </a>
            </md-nav-list>
        </md-sidenav>
        <div class="app-layout">
            <md-toolbar color="primary">
                <span class="toolbar-title">Duck</span>
                <button md-icon-button
                    (click)="sidenav.open()">
                    <md-icon fontIcon="menu"></md-icon>
                </button>
            </md-toolbar>
            <router-outlet></router-outlet>
        </div>
    </md-sidenav-container>
  `,
  styleUrls: ['duck-app.scss']
})
export class DuckApp {
  constructor(public domSanitizer: DomSanitizer, public mdIconRegistry: MdIconRegistry) { }

  ngOnInit() {
    this.initMdIcons();
  }

  initMdIcons() {
    this.mdIconRegistry.registerFontClassAlias('material-icons');
    this.mdIconRegistry.registerFontClassAlias('mdi');
    this.mdIconRegistry.setDefaultFontSetClass('material-icons');
    // this.mdIconRegistry.addSvgIconInNamespace(
    //     'duck',
    //     'icon_name',
    //     this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    // );
  }
}
