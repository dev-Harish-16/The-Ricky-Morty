import { inject, Injectable } from '@angular/core';
import { Character } from '../data/model/characters.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private readonly http: HttpClient = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<ApiResponse>('https://rickandmortyapi.com/api/character')
      .pipe(map((response: ApiResponse) => response.results));
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  }
}
