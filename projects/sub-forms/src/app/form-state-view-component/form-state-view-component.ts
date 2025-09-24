import {Component, input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {CardModule, IconModule} from '@kirbydesign/designsystem';
import {startWith} from 'rxjs';
import {JsonPipe} from '@angular/common';


export interface FormNode2 {
  name: string;
  showValue: boolean;
  item: AbstractControl;
  level: number;
}

@Component({
  selector: 'app-form-state-view-component',
  imports: [
    CardModule,
    JsonPipe,
    IconModule,
  ],
  templateUrl: './form-state-view-component.html',
  styleUrl: './form-state-view-component.scss'
})
export class FormStateViewComponent implements OnInit {
  form = input.required<AbstractControl>();
  dataSourceFlat!: FormNode2[];

  ngOnInit(): void {
    this.form().events.pipe(
      startWith(null)
    ).subscribe(() => {
      this.dataSourceFlat = this.buildFormNode2(this.form(), "root");
    });
  }

  private buildFormNode2(control: AbstractControl, name: string, level = 0, data: FormNode2[] = []): FormNode2[] {

    const node: FormNode2 = {
      name,
      item: control,
      level,
      showValue: control instanceof FormControl
    }

    data.push(node);

    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.keys(control.controls).forEach(childControlName => {
        let childControl = control.get(childControlName);
        if (!childControl) return;

        this.buildFormNode2(childControl, childControlName, level + 1, data);
      })
    }

    return data;
  }
}
