import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { CharacterRepository } from './data/repositoy/characters.repository';
import { Card } from '../../shared/components/card/card';

import { Router } from '@angular/router';
import { Character } from './data/model/characters.model';
import { Snackbar } from '../../shared/services/snackbar/snackbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-characters',
  imports: [Card, MatButtonModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Characters implements OnInit, OnDestroy {
  private readonly characterRepository: CharacterRepository = inject(CharacterRepository);
  private readonly snackBar = inject(Snackbar);
  private readonly router = inject(Router);
  getCharacters = signal<Character[]>([]);
  loading = true;

  ngOnInit() {
    this.characterRepository.getCharacters().subscribe({
      next: (characters) => {
        this.getCharacters.set(characters);
        this.snackBar.open(`Loaded ${characters.length} characters`, 'Close', 3000);
        console.log(characters);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching characters:', err);
        this.snackBar.open(`Failed to load characters`, 'Close', 3000);
      },
    });
  }

  onCardSelection(cardInfo: any) {
    this.router.navigate(['characters', cardInfo.id]);
  }
  back() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.snackBar.destroy();
  }
}
