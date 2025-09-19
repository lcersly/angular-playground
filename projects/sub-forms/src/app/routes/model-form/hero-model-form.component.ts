import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {PowersFormComponent, PowerType} from './powers-component/powers-form.component';
import {CardModule, ItemModule, SectionHeaderComponent} from '@kirbydesign/designsystem';
import {FormStateViewComponent} from '../../form-state-view-component/form-state-view-component';

@Component({
  selector: 'app-view-child-component',
  imports: [
    CardModule,
    PowersFormComponent,
    ReactiveFormsModule,
    FormStateViewComponent,
    SectionHeaderComponent,
    ItemModule
  ],
  templateUrl: './hero-model-form.component.html',
  styleUrl: './hero-model-form.component.scss'
})
export class HeroModelFormComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public heroForm = this.formBuilder.group({
    heroName: ['', Validators.required],
    aka: ['', Validators.required],
    powers: this.formBuilder.group({
      power1: '',
      power2: '',
      power3: 'abc',
    } satisfies PowerType)
  }, {
    validators: [this.validateHero()]
  })

  private validateHero(): ValidatorFn {
    return (control) => {
      const power1Control = control.get('powers.power1');
      const power2Control = control.get('powers.power2');

      if(!power1Control){
        throw new Error("Missing power1 control for validator");
      }
      if(!power2Control){
        throw new Error("Missing power2 control for validator");
      }

      const power1 = power1Control.value;
      const power2 = power2Control.value;

      if (power1 && power2) {
        return {power1AndPower2: true};
      }

      return null;
    };
  }
}
