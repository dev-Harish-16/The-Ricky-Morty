import { Observable } from 'rxjs';
import { Character } from '../model/characters.model';

export abstract class CharacterRepository {
  abstract getCharacters(): Observable<Character[]>;
  abstract getCharacterById(id: number): Observable<Character[]>;
}
