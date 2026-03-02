import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterRepository } from '../data/repositoy/characters.repository';
import { Character, CharacterFilter } from '../data/model/characters.model';

import { CharacterApiService } from '../service/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterRepositoryImpl extends CharacterRepository {
  private readonly characterApiService: CharacterApiService = inject(CharacterApiService);
  override getCharacters(filter?: Partial<CharacterFilter>): Observable<Character[]> {
    return this.characterApiService.getCharacters(filter);
  }
  override getCharacterById(id: number): Observable<Character> {
    return this.characterApiService.getCharacterById(id);
  }
}
