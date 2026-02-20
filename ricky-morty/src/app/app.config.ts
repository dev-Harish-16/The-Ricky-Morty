import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ConfigService } from './core/services/config.service';
import { provideHttpClient } from '@angular/common/http';
import { CharacterRepository } from './features/characters/data/repositoy/characters.repository';
import { CharacterRepositoryImpl } from './features/characters/domain/characters.repository.impl';

// add more implementations here and add to providers array
const provideDependencyInversion = [
  {
    provide: CharacterRepository,
    useClass: CharacterRepositoryImpl,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    ...provideDependencyInversion,
  ],
};
