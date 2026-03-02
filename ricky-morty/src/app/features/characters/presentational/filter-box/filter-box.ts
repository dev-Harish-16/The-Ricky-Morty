import { Component, inject, OnInit, input, output, effect, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CharacterFilter } from '../../data/model/characters.model';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter-box.html',
  styleUrls: ['./filter-box.scss'],
})
export class FilterBox implements OnInit, OnDestroy {
  parameters = input<Partial<CharacterFilter>>();

  applyFilters = output<Partial<CharacterFilter>>();

  filterForm!: FormGroup<{
    name: FormControl<string>;
    status: FormControl<string>;
    gender: FormControl<string>;
    species: FormControl<string>;
  }>;

  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.initializeForm();

    effect(() => {
      const params = this.parameters();
      if (params) {
        this.filterForm.patchValue(params, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      )
      .subscribe(() => {
        this.applyFilters.emit(this.cleanParams(this.filterForm.getRawValue()));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm() {
    this.filterForm = this.fb.nonNullable.group({
      name: [''],
      status: [''],
      gender: [''],
      species: [''],
    });
  }

  resetFilters() {
    this.filterForm.reset(
      {
        name: '',
        status: '',
        gender: '',
        species: '',
      },
      { emitEvent: false },
    );
    this.applyFilters.emit({});
  }

  private cleanParams(params: CharacterFilter): Partial<CharacterFilter> {
    return Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value),
    ) as Partial<CharacterFilter>;
  }
}
