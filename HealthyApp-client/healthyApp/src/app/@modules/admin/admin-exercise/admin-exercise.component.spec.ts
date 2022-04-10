import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExerciseComponent } from './admin-exercise.component';

describe('AdminExerciseComponent', () => {
  let component: AdminExerciseComponent;
  let fixture: ComponentFixture<AdminExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
