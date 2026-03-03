import { Observable } from 'rxjs';
import { ApiResponse, Character, CharacterFilter } from '../model/characters.model';

export abstract class CharacterRepository {
  abstract getCharacters(filter?: Partial<CharacterFilter>, page?: number): Observable<ApiResponse>;
  abstract getCharacterById(id: number): Observable<Character>;
}
