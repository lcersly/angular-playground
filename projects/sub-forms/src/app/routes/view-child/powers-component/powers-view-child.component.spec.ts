import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PowersViewChildComponent} from './powers-view-child.component';

describe('PowersComponent', () => {
  let component: PowersViewChildComponent;
  let fixture: ComponentFixture<PowersViewChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowersViewChildComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowersViewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
