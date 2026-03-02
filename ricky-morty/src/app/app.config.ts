import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CharacterRepository } from './features/characters/data/repositoy/characters.repository';
import { CharacterRepositoryImpl } from './features/characters/domain/characters.repository.impl';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { errorInterceptor } from './core/interceptor/error-interceptor';

const provideDI = [
  {
    provide: CharacterRepository,
    useClass: CharacterRepositoryImpl,
  },
];

const provideMaterialFormFieldConfig = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { subscriptSizing: 'dynamic' },
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withViewTransitions()),
    ...provideDI,
    ...provideMaterialFormFieldConfig,
  ],
};
