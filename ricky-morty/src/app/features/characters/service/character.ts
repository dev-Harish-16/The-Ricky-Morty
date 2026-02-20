import { inject, Injectable } from '@angular/core';
import { Character } from '../data/modle/characters.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterApiService {
  private readonly http: HttpClient = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http.get('https://rickandmortyapi.com/api/character').pipe(
      map((response: any) =>
        response.results?.map((item: any) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          species: item.species,
          gender: item.gender,
          image: item.image,
        })),
      ),
    );
  }

  getCharacterById(id: number): Observable<Character[]> {
    return this.http.get('https://rickandmortyapi.com/api/character/' + id).pipe(
      map((response: any) =>
        response.results?.map((item: any) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          species: item.species,
          gender: item.gender,
          image: item.image,
        })),
      ),
    );
  }
}
