import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamPanelComponent } from './student-exam-panel.component';

describe('StudentExamPanelComponent', () => {
  let component: StudentExamPanelComponent;
  let fixture: ComponentFixture<StudentExamPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentExamPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
