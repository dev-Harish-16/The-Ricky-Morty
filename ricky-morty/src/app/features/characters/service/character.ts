import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Snackbar } from '../../../shared/services/snackbar/snackbar';
import { ApiResponse, Character, CharacterFilter } from '../data/model/characters.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.API_ENDPOINT.CHARACTER_URL;
  private readonly snackBar = inject(Snackbar);

  getCharacters(filter?: Partial<CharacterFilter>, page?: number): Observable<ApiResponse> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page);
    }

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      catchError(() => {
        this.snackBar.error('Failed to fetch characters.');
        return of({
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        } as ApiResponse);
      }),
    );
  }
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.snackBar.error(`Failed to fetch character with id ${id}. Please try again later.`);
        return of(null as any); // Return null on error
      }),
    );
  }
}
