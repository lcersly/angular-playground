import {Component, inject, signal} from '@angular/core';
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

  public heroForm = this.formBuilder.group({
    heroName: ['', Validators.required],
    aka: ['', Validators.required],
  })

  public powersValue = signal<PowerType>({
    power3: "abc"
  });
  public powersValid = signal(false);



  // private validateHero(): ValidatorFn {
  //   return (control) => {
  //     const power1Control = control.get('powers.power1');
  //     const power2Control = control.get('powers.power2');
  //
  //     if(!power1Control){
  //       throw new Error("Missing power1 control for validator");
  //     }
  //     if(!power2Control){
  //       throw new Error("Missing power2 control for validator");
  //     }
  //
  //     const power1 = power1Control.value;
  //     const power2 = power2Control.value;
  //
  //     if (power1 && power2) {
  //       return {power1AndPower2: true};
  //     }
  //
  //     return null;
  //   };
  // }
}
