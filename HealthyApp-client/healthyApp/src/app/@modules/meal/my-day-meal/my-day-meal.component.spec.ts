import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDayMealComponent } from './my-day-meal.component';

describe('MyDayMealComponent', () => {
  let component: MyDayMealComponent;
  let fixture: ComponentFixture<MyDayMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDayMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDayMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
