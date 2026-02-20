import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'characters',
    loadComponent: () => import('./features/characters/characters').then((m) => m.Characters),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
