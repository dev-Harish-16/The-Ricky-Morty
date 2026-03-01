import { Component, inject, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { Loader } from '../../shared/components/loader/loader';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-landing-page',
  imports: [Loader, MatButtonModule, MatSlideToggleModule, RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  protected readonly title: Signal<string> = signal('Ricky Morty Explorer');
  private readonly themeService: ThemeService = inject(ThemeService);
  theme = this.themeService.getTheme();
  checked = signal(this.theme === 'dark');
  constructor() {}

  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme = this.themeService.getTheme();
  }

  get themeLabel() {
    return this.theme === 'dark' ? 'Dark Mode' : 'Light Mode';
  }
}
