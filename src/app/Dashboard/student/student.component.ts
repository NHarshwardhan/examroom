import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './Services/student.service';
import { StudentCourseSelectionComponent } from './student-course-selection/student-course-selection.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  isDisablePanel = true;
  selectedCourse = '';
  constructor(private stdService: StudentService) {}

  ngOnInit(): void {
    this.stdService.coursename.subscribe({
      next: (course) => {
        this.selectedCourse = course;
        this.setDisablePanel();
      },
    });
  }

  setDisablePanel() {
    this.isDisablePanel = this.selectedCourse ? false : true;
  }
}
