import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { DuckAppModule } from './app/module';
import './styles.scss';

if (ENVIRONMENT === 'production') enableProdMode();

export function main(): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(DuckAppModule).
      catch(err => console.error(err));
}

bootloader(main);
