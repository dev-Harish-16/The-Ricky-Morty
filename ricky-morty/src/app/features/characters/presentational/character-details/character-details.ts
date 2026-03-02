import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { Character } from '../../data/model/characters.model';
import { CharacterRepository } from '../../data/repositoy/characters.repository';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatGridListModule, MatButtonModule],
  templateUrl: './character-details.html',
  styleUrls: ['./character-details.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CharacterDetails implements OnInit {
  private readonly CharacterRepository: CharacterRepository = inject(CharacterRepository);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  character = signal<Character | null>(null);
  loading = true;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.CharacterRepository.getCharacterById(id).subscribe({
      next: (character) => {
        this.character.set(character);
      },
      error: (err) => {
        console.error('Error fetching character details:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  back() {
    this.router.navigate(['characters']);
  }

  showAll = false;

  openEpisode(url: string) {
    window.open(url, '_blank');
  }
}
