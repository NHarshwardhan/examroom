import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseSelectionComponent } from './student-course-selection.component';

describe('StudentCourseSelectionComponent', () => {
  let component: StudentCourseSelectionComponent;
  let fixture: ComponentFixture<StudentCourseSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCourseSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCourseSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
