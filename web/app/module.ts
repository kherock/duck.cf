import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { DuckApp } from './duck-app';
import { DuckAscii } from './duck-ascii';
import { NoContent } from './no-content';
import { RanDuck } from './ran-d-uck';

import { AppState } from './state';
import { ROUTES } from './routes';

import { DuckAPI } from './core/api';

@NgModule({
  bootstrap: [DuckApp],
  declarations: [
    DuckApp,
    DuckAscii,
    NoContent,
    RanDuck
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot()
  ],
  providers: [
    AppState,
    DuckAPI
  ]
})
export class DuckAppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state
    this.appState.set(store.state);
    // restore input values
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const currentState = this.appState.get();
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
