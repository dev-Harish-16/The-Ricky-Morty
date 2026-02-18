import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { ConfigService } from './core/services/config.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    ConfigService,
    provideAppInitializer(() => {
      const configService = inject(ConfigService);
      // Set initial config values here
      configService.setConfig('apiUrl', 'https://rickandmortyapi.com/api');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      configService.setConfig('theme', prefersDark ? 'dark' : 'light');
      return Promise.resolve();
    }),
  ],
};
