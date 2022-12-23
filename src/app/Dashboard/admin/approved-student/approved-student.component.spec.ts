import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedStudentComponent } from './approved-student.component';

describe('ApprovedStudentComponent', () => {
  let component: ApprovedStudentComponent;
  let fixture: ComponentFixture<ApprovedStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
