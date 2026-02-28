import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card } from './card';
import { Character } from '../../../features/characters/data/model/characters.model';
import { inputBinding, outputBinding, signal } from '@angular/core';

describe('Card', () => {
  let component: Card;
  let fixture: ComponentFixture<Card>;

  let cardInfoSignal: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    cardInfoSignal = signal({} as Character);

    fixture = TestBed.createComponent(Card, {
      bindings: [
        inputBinding('cardInfo', () => cardInfoSignal()),
        outputBinding('selected', () => {}),
      ],
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected character on select', () => {
    vi.spyOn(component.selected, 'emit');
    const mockCharacter = { id: 1, name: 'Rick Sanchez' } as Character;
    cardInfoSignal.set(mockCharacter);
    component.onSelect();
    expect(component.selected.emit).toHaveBeenCalledWith(mockCharacter);
  });
});
