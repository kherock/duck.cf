import { Routes } from '@angular/router';
import { DuckAscii } from './duck-ascii';
import { DuckBlog } from './duck-blog';
import { NoContent } from './no-content';
import { RanDuck } from './ran-d-uck';

export const ROUTES: Routes = [
  { path: '', component: RanDuck },
  { path: 'ascii', component: DuckAscii },
  { path: 'duck-blog', component: DuckBlog },
  { path: '**', component: NoContent }
];
