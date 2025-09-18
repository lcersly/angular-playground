import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowersMixedComponent } from './powers-mixed.component';

describe('PowersComponent', () => {
  let component: PowersMixedComponent;
  let fixture: ComponentFixture<PowersMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowersMixedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowersMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
