import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './module';
const platform = platformBrowserDynamic();
enableProdMode();
platform.bootstrapModule(AppModule);
