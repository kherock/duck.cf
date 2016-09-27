import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { DuckApp } from './duck-app';
import { NoContent } from './no-content';
import { ROUTES } from './routes';

@NgModule({
  bootstrap: [DuckApp],
  declarations: [
    DuckApp,
    NoContent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: []
})
export class DuckAppModule {
  constructor(public appRef: ApplicationRef) {}
}
