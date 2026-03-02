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

  filterParams = signal<Partial<CharacterFilter>>({}); // Start as null

  ngOnInit(): void {
    // Only read query params once on init
    const params = this.route.snapshot.queryParams;
    const initialFilters: Partial<CharacterFilter> = {
      name: params['name'] || '',
      species: params['species'] || '',
      status: params['status'] || '',
      gender: params['gender'] || '',
    };

    this.filterParams.set(initialFilters);

    // Load characters only once
    this.loadCharacters(initialFilters);
  }

  ngOnDestroy(): void {
    this.snackBar.destroy();
  }

  loadCharacters(filters: Partial<CharacterFilter>) {
    this.loading.set(true);
    this.characterRepository.getCharacters(filters).subscribe({
      next: (characters) => {
        this.getCharacters.set(characters);
        if (characters.length > 0) this.snackBar.success('Characters loaded successfully!');
      },
      error: () => this.getCharacters.set([]),
      complete: () => this.loading.set(false),
    });
  }

  applyFilters(filters: Partial<CharacterFilter>) {
    if (JSON.stringify(this.filterParams()) === JSON.stringify(filters)) return;

    this.filterParams.set(filters);
    this.loadCharacters(filters);

    // Only include non-empty filters in URL
    const queryParams = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value));

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
