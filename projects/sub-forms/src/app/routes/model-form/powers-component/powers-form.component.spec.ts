import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PowersFormComponent} from './powers-form.component';

describe('PowersComponent', () => {
  let component: PowersFormComponent;
  let fixture: ComponentFixture<PowersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowersFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
