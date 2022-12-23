import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamQuestionListComponent } from './student-exam-question-list.component';

describe('StudentExamQuestionListComponent', () => {
  let component: StudentExamQuestionListComponent;
  let fixture: ComponentFixture<StudentExamQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamQuestionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
