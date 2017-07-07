import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { MaterialModule } from './material';

import { DuckApp } from './duck-app';
import { DuckAscii } from './duck-ascii';
import { DuckChat } from './duck-chat';
import { NoContent } from './no-content';
import { RanDuck } from './ran-d-uck';

import * as coreProviders from './core';

const routes: Routes = [
  { path: '', component: RanDuck },
  { path: 'ascii', component: DuckAscii },
  { path: 'duck-chat', component: DuckChat },
  { path: '**', component: NoContent }
];

@NgModule({
  declarations: [
    DuckApp,
    DuckAscii,
    DuckChat,
    NoContent,
    RanDuck
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ...Object.values(coreProviders)
  ],
  entryComponents: [],
  bootstrap: [DuckApp]
})
export class DuckAppModule {
  constructor(public appRef: ApplicationRef) {}

  hmrOnInit(store: any) {
    if (!store) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state
    //if (!store.state) this.appState.set(store.state);
    // restore input values
    if ('restoreInputValues' in store) store.restoreInputValues();
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    //const currentState = this.appState.get();
    //store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
