import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../../features/characters/data/model/characters.model';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  cardInfo = input.required<Character>();

  selected = output<Character>();
  onSelect() {
    // Implement the logic to handle card selection, e.g., navigate to a detail page or emit an event
    this.selected.emit(this.cardInfo());
  }
}
