import {Component, inject, OnInit, viewChild} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {PowerControlType, PowersViewChildComponent} from './powers-component/powers-view-child.component';
import {CardModule, ItemModule, SectionHeaderComponent} from '@kirbydesign/designsystem';
import {FormStateViewComponent} from '../../form-state-view-component/form-state-view-component';

@Component({
  selector: 'app-view-child-component',
  imports: [
    CardModule,
    PowersViewChildComponent,
    ReactiveFormsModule,
    FormStateViewComponent,
    SectionHeaderComponent,
    ItemModule
  ],
  templateUrl: './hero-view-child.component.html',
  styleUrl: './hero-view-child.component.scss'
})
export class HeroViewChildComponent implements OnInit{
  private formBuilder = inject(NonNullableFormBuilder);
  private powersComponent = viewChild.required(PowersViewChildComponent);

  public heroForm!: FormGroup<{
    heroName: FormControl<string>,
    aka: FormControl<string>,
    powers: PowerControlType
  }>;

  public ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      heroName: ['', Validators.required],
      aka: ['', Validators.required],
      powers: this.powersComponent().getFormGroup(),
    }, {
      validators: [this.validateHero()]
    })

    this.heroForm.patchValue({
      powers:{
        power3: 'abc'
      }
    })
  }

  private validateHero():ValidatorFn {
    return (control)=>{
      const power1Control = control.get('powers.power1');
      const power2Control = control.get('powers.power2');

      if(!power1Control || !power2Control){
        throw new Error("Missing controls for validator");
      }

      const power1 = power1Control.value;
      const power2 = power2Control.value;

      if(power1 && power2){
        return {power1AndPower2: true};
      }

      return null;
    };
  }
}
