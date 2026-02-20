import { Component, inject } from '@angular/core';
import { CharacterRepository } from './data/repositoy/characters.repository';
import { Card } from '../../shared/components/card/card';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-characters',
  imports: [Card, AsyncPipe],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters {
  private readonly characterRepository: CharacterRepository = inject(CharacterRepository);

  $getCharacters = this.characterRepository.getCharacters();

  $getCharacterById(id: number) {
    return this.characterRepository.getCharacterById(id);
  }
}
