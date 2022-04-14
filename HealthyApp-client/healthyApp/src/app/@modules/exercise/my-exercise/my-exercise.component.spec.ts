import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExerciseComponent } from './my-exercise.component';

describe('MyExerciseComponent', () => {
  let component: MyExerciseComponent;
  let fixture: ComponentFixture<MyExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
