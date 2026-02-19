import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
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
