import {Component, effect, inject, model, OnInit, output} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {startWith} from 'rxjs';


export type PowerType = Partial<{
  power1: string
  power2: string
  power3: string
}>

@Component({
  selector: 'app-powers-form-component',
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './powers-form.component.html',
  styleUrl: './powers-form.component.scss'
})
export class PowersFormComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder)
  public value = model.required<PowerType>();
  public valid = output<boolean>();

  constructor() {
    effect(() => this.form.patchValue(this.value(), {emitEvent: false}));
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(nextValue => this.value.set(nextValue));
    this.form.statusChanges.pipe(
      startWith(this.form.status)
    ).subscribe(value => this.valid.emit(value === 'VALID'));
  }


  form = this.fb.group({
    power1: this.fb.control('', Validators.required),
    power2: this.fb.control(''),
    power3: this.fb.control(''),
  })
}
