import {Component, inject} from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

export type PowerControlType = FormGroup<{
  power1: FormControl<string>;
  power2: FormControl<string>;
  power3: FormControl<string>
}>

const delayAsyncValidator: AsyncValidatorFn = () => new Promise(resolve => setTimeout(resolve, 1000, null));

@Component({
  selector: 'app-powers-viewchild-component',
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './powers-view-child.component.html',
  styleUrl: './powers-view-child.component.scss'
})
export class PowersViewChildComponent {
  private fb = inject(NonNullableFormBuilder)

  form: PowerControlType = this.fb.group({
    power1: this.fb.control('', Validators.required),
    power2: this.fb.control('', null, delayAsyncValidator),
    power3: this.fb.control(''),
  })

  getFormGroup(): PowerControlType {
    return this.form;
  }
}
