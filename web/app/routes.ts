import { Routes } from '@angular/router';
import { NoContent } from './no-content';

export const ROUTES: Routes = [
  // { path: '' },
  { path: '**', component: NoContent },
];