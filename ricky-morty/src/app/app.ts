import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title: Signal<string> = signal('Ricky Morty Explorer');
  isDark = false;

  constructor(private readonly themeService: ThemeService) {}

  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setDarkTheme(this.isDark);
  }

  get themeLabel() {
    return this.isDark ? 'Light Mode' : 'Dark Mode';
  }
}
