import {Component, input} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CardModule} from '@kirbydesign/designsystem';

export interface FieldError {
  formGroupName: string;
  fieldName: string;
  errorCode: string;
}

@Component({
  selector: 'app-form-state-view-component',
  imports: [
    JsonPipe,
    CardModule
  ],
  templateUrl: './form-state-view-component.html',
  styleUrl: './form-state-view-component.scss'
})
export class FormStateViewComponent {
  form = input.required<AbstractControl>();

  errors(){
    const errors:FieldError[] = [];
    this.getFormErrors(this.form(), "root", "", errors);
    return errors;
  }

  private getFormErrors(
    control: AbstractControl,
    formGroupName: string,
    fieldName: string,
    errors: FieldError[]) {

    if (control instanceof FormGroup) {
      const controlErrors: ValidationErrors | null = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorCode => {
          errors.push({
            formGroupName: formGroupName,
            fieldName: fieldName,
            errorCode: errorCode
          })
        });
      }

      Object.keys(control.controls).forEach(controlName => {
        let formControl = control.get(controlName);
        if (formControl) {
          let fGroupName = formGroupName + "." + controlName;
          this.getFormErrors(formControl, fGroupName, controlName, errors);
        }
      })
    }

    if (control instanceof FormArray) {
      control.controls.forEach((fControl: AbstractControl, index) => {
        let fGroupName = formGroupName + "." + index;
        this.getFormErrors(fControl, fGroupName, "Array", errors);
      })
    }

    if (control instanceof FormControl) {
      const controlErrors: ValidationErrors | null = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorCode => {
          errors.push({
            formGroupName: formGroupName,
            fieldName: fieldName,
            errorCode: errorCode
          })
        });
      }
    }
  }
}
