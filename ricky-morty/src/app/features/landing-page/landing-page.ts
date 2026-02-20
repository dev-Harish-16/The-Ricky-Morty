import { Component, inject, Signal, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-landing-page',
  imports: [Card],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  protected readonly title: Signal<string> = signal('Ricky Morty Explorer');
  private readonly themeService: ThemeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  constructor() {}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.getTheme();
  }

  get themeLabel() {
    return this.theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
}
