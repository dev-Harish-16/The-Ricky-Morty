import { Injectable, Renderer2, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly darkThemeClass = signal('dark-theme');

  constructor(private readonly renderer: Renderer2) {
    // Initialize theme based on user preference or default
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkTheme(prefersDark);
  }

  setDarkTheme(isDark: boolean) {
    if (isDark) {
      this.renderer.addClass(document.body, this.darkThemeClass());
    } else {
      this.renderer.removeClass(document.body, this.darkThemeClass());
    }
  }

  isDarkTheme(): boolean {
    return document.body.classList.contains(this.darkThemeClass());
  }
}
