import { effect, inject, Injectable, signal } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly configService = inject(ConfigService);

  readonly isDark = signal(false);

  constructor() {
    const savedTheme = this.configService.getConfig('theme');
    this.isDark.set(savedTheme === 'dark');

    effect(() => {
      const body = document.body;

      if (this.isDark()) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    });
  }

  toggleTheme() {
    this.isDark.update((value) => !value);
    this.configService.setConfig('theme', this.isDark() ? 'dark' : 'light');
  }

  setDarkTheme(value: boolean) {
    this.isDark.set(value);
    this.configService.setConfig('theme', value ? 'dark' : 'light');
  }
}
