import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { Card } from '../../../../shared/components/card/card';
import { Snackbar } from '../../../../shared/services/snackbar/snackbar';
import { FilterBox } from '../../components/filter-box/filter-box';
import { Character, CharacterFilter } from '../../data/model/characters.model';
import { CharacterRepository } from '../../data/repositoy/characters.repository';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [Card, FilterBox, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Characters implements OnInit, OnDestroy {
  private readonly characterRepository = inject(CharacterRepository);
  private readonly snackBar = inject(Snackbar);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  getCharacters = signal<Character[]>([]);
  loading = signal(false);

  filterParams = signal<Partial<CharacterFilter>>({});
  page = signal(1);
  totalPages = signal(1);

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;

    const initialFilters: Partial<CharacterFilter> = {
      name: params['name'] || '',
      species: params['species'] || '',
      status: params['status'] || '',
      gender: params['gender'] || '',
    };

    const initialPage = Number(params['page'] || 1);

    this.filterParams.set(initialFilters);
    this.page.set(initialPage);

    this.loadCharacters(initialFilters, initialPage);
  }

  ngOnDestroy(): void {
    this.snackBar.destroy();
  }

  loadCharacters(filters: Partial<CharacterFilter>, page: number) {
    this.loading.set(true);

    this.characterRepository.getCharacters(filters, page).subscribe({
      next: (response) => {
        this.getCharacters.set(response.results);
        this.totalPages.set(response.info.pages);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        this.getCharacters.set([]);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  applyFilters(filters: Partial<CharacterFilter>) {
    if (JSON.stringify(this.filterParams()) === JSON.stringify(filters)) {
      return;
    }

    this.filterParams.set(filters);
    this.page.set(1); // reset page when filters change

    this.updateUrl();
    this.loadCharacters(filters, 1);
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      const next = this.page() + 1;
      this.page.set(next);

      this.updateUrl();
      this.loadCharacters(this.filterParams(), next);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      const prev = this.page() - 1;
      this.page.set(prev);

      this.updateUrl();
      this.loadCharacters(this.filterParams(), prev);
    }
  }

  private updateUrl() {
    const cleanedFilters = Object.fromEntries(
      Object.entries(this.filterParams()).filter(([_, value]) => value),
    );

    const queryParams = {
      ...cleanedFilters,
      page: this.page(),
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
  }

  onCardSelection(cardInfo: Character) {
    this.router.navigate(['characters', cardInfo.id]);
  }

  back() {
    this.router.navigate(['home']);
  }
}
