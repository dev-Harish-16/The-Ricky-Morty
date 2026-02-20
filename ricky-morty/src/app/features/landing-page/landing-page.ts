import { Component, inject, Signal, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  protected readonly title: Signal<string> = signal('Ricky Morty Explorer');
  private readonly themeService: ThemeService = inject(ThemeService);
  isDark = this.themeService.isDark();
  constructor() {}

  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setDarkTheme(this.isDark);
  }

  get themeLabel() {
    return this.isDark ? 'Light Mode' : 'Dark Mode';
  }
}
