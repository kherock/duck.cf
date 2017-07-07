import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { DuckAppModule } from './app/module';
import './styles.scss';

if (process.env.NODE_ENV === 'production') enableProdMode();

export async function main() {
  try {
    await platformBrowserDynamic().bootstrapModule(DuckAppModule);
  } catch (err) { console.error(err); }
}

bootloader(main);
