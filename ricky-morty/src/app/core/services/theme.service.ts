import { Injectable, effect, signal } from '@angular/core';

export type AppTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';

  private readonly theme = signal<AppTheme>(this.getInitialTheme());

  constructor() {
    // Apply theme whenever it changes
    console.log('INSTANCE ID:', Math.random());
    effect(() => {
      const current = this.theme();
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${current}-theme`);
      localStorage.setItem(this.THEME_KEY, current);
    });
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  getTheme() {
    return this.theme();
  }

  private getInitialTheme(): AppTheme {
    const saved = localStorage.getItem(this.THEME_KEY) as AppTheme;
    if (saved) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
