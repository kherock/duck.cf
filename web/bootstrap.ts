import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DuckAppModule } from './app/module';

if (ENVIRONMENT === 'production') enableProdMode();

export default platformBrowserDynamic().bootstrapModule(DuckAppModule).
    catch(err => console.error(err));