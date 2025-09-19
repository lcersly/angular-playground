import {Component, effect, inject, Signal, signal} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {PowersMixedComponent, PowerType} from './powers-component/powers-mixed.component';
import {CardModule, ItemModule, SectionHeaderComponent} from '@kirbydesign/designsystem';
import {FormStateViewComponent} from '../../form-state-view-component/form-state-view-component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-view-child-component',
  imports: [
    CardModule,
    PowersMixedComponent,
    ReactiveFormsModule,
    FormStateViewComponent,
    SectionHeaderComponent,
    ItemModule,
    JsonPipe
  ],
  templateUrl: './hero-model-mixed.component.html',
  styleUrl: './hero-model-mixed.component.scss'
})
export class HeroModelMixedComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  public powersValue = signal<PowerType>({
    power3: "abc"
  });
  public powersValid = signal(false);

  public heroForm = this.formBuilder.group({
    heroName: ['', Validators.required],
    aka: ['', Validators.required],
  }, {validators: [this.validateHero(this.powersValue)]})

  constructor(){
    effect(() => {
      //listen for any changes to these signals
      this.powersValid();
      this.powersValue();

      //then re-evaluate the form validity
      this.heroForm.updateValueAndValidity();
    })
  }


  private validateHero(powersValue: Signal<PowerType>): ValidatorFn {
    return (control) => {
      const power1 = powersValue().power1
      const power2 = powersValue().power2

      if (power1 && power2) {
        return {power1AndPower2: true};
      }

      return null;
    };
  }
}
