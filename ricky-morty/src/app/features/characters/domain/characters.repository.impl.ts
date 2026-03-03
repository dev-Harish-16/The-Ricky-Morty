import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Character, CharacterFilter } from '../data/model/characters.model';
import { CharacterRepository } from '../data/repositoy/characters.repository';

import { CharacterApiService } from '../service/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterRepositoryImpl extends CharacterRepository {
  private readonly characterApiService: CharacterApiService = inject(CharacterApiService);
  override getCharacters(
    filter?: Partial<CharacterFilter>,
    page?: number,
  ): Observable<ApiResponse> {
    return this.characterApiService.getCharacters(filter, page);
  }
  override getCharacterById(id: number): Observable<Character> {
    return this.characterApiService.getCharacterById(id);
  }
}
