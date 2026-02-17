import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly darkThemeClass = signal('dark-theme');

  constructor() {
    // Initialize theme based on user preference or default
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkTheme(prefersDark);
  }

  setDarkTheme(isDark: boolean) {
    const body = document.body;
    if (isDark) {
      body.classList.add(this.darkThemeClass());
    } else {
      body.classList.remove(this.darkThemeClass());
    }
  }

  isDarkTheme(): boolean {
    return document.body.classList.contains(this.darkThemeClass());
  }
}
