import {Component, effect, inject, model, OnInit, output} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

export type PowerType = Partial<{
  power1: string
  power2: string
  power3: string
}>

@Component({
  selector: 'app-powers-mixed-component',
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './powers-mixed.component.html',
  styleUrl: './powers-mixed.component.scss'
})
export class PowersMixedComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder)
  public value = model.required<PowerType | undefined>();
  public valid = output<boolean>();

  constructor() {
    effect(() => this.form.patchValue(this.value() ?? {}, {emitEvent: false}));
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => this.value.set(value));
    this.form.statusChanges.subscribe(value => this.valid.emit(value === 'VALID'));
  }

  form = this.fb.group({
    power1: this.fb.control('', Validators.required),
    power2: this.fb.control(''),
    power3: this.fb.control(''),
  })
}
