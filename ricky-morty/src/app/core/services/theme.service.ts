import { Injectable, signal } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly darkThemeClass = signal('dark-theme');

  constructor(private readonly configService: ConfigService) {
    // Initialize theme based on user preference or default
    this.configService.getConfig('theme') === 'dark'
      ? this.setDarkTheme(true)
      : this.setDarkTheme(false);
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
