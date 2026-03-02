import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/presentational/characters/characters').then(
        (m) => m.Characters,
      ),
  },
  {
    path: 'characters/:id',
    loadComponent: () =>
      import('./features/characters/presentational/character-details/character-details').then(
        (m) => m.CharacterDetails,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
