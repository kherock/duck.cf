import { Routes } from '@angular/router';
import { DuckAscii } from './duck-ascii';
import { NoContent } from './no-content';

export const ROUTES: Routes = [
  { path: '', component: DuckAscii },
  { path: '**', component: NoContent }
];