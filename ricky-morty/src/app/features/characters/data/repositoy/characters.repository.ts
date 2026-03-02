import { Observable } from 'rxjs';
import { Character, CharacterFilter } from '../model/characters.model';

export abstract class CharacterRepository {
  abstract getCharacters(filter?: Partial<CharacterFilter>): Observable<Character[]>;
  abstract getCharacterById(id: number): Observable<Character>;
}
