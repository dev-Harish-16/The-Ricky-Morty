import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../../features/characters/data/model/characters.model';
import { Badge } from '../badge/badge';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule, Badge],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  cardInfo = input.required<Character>();

  selected = output<Character>();
  onSelect() {
    this.selected.emit(this.cardInfo());
  }
}
