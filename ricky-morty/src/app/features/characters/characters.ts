import { Component, inject } from '@angular/core';
import { CharacterRepository } from './data/repositoy/characters.repository';
import { Card } from '../../shared/components/card/card';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-characters',
  imports: [Card, AsyncPipe],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters {
  private readonly characterRepository: CharacterRepository = inject(CharacterRepository);
  private readonly snackBar = inject(MatSnackBar);
  getCharacters$ = this.characterRepository.getCharacters();

  getCharacterById$(id: number) {
    return this.characterRepository.getCharacterById(id);
  }

  OnCardSelection(cardInfo: any) {
    // Implement the logic to handle card selection, e.g., navigate to a detail page or display character details
    console.log('Card selected:', cardInfo);
    this.snackBar.open(`${cardInfo.name || 'Character'} selected`, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
