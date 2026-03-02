import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Snackbar } from '../../../shared/services/snackbar/snackbar';
import { Character, CharacterFilter } from '../data/model/characters.model';
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
  private readonly apiUrl = 'https://rickandmortyapi.com/api/character';
  private readonly snackBar = inject(Snackbar);

  getCharacters(filter?: Partial<CharacterFilter>): Observable<Character[]> {
    let params = new HttpParams();

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      map((res) => res.results),
      catchError(() => {
        this.snackBar.error('Failed to fetch characters.');
        return of([]);
      }),
    );
  }
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`).pipe(
      catchError((error) => {
        this.snackBar.error(`Failed to fetch character with id ${id}. Please try again later.`);
        return of(null as any); // Return null on error
      }),
    );
  }
}
