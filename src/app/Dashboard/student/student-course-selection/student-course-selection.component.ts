import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Services/student.service';
import { IApprovedStudent } from './../../admin/Interfaces/iapproved-student';


@Component({
  selector: 'app-student-course-selection',
  templateUrl: './student-course-selection.component.html',
  styleUrls: ['./student-course-selection.component.css'],

})
export class StudentCourseSelectionComponent implements OnInit {

  Courses: string[] = [];
  selectedCourse = '';
  questionnumber = 0;
  isExamStart = false

  constructor(private stdService:StudentService) { }

  ngOnInit(): void {
    let loggedInUser = sessionStorage.getItem('email')
        this.stdService.getStudentWithExamInfo().subscribe({
           next:(response:any)=>{
               const ExamInfo = response.find((res:any)=> res.email === loggedInUser)
               if(ExamInfo){
                   this.Courses?.push(ExamInfo.examkey)
                   this.selectedCourse = ExamInfo.examname
               }
           },
           error:(reason)=>{
              console.log(reason)
           }
        })



  }
  selectCourseByUser(){
    this.stdService.coursename.next(this.selectedCourse)
    this.isExamStart = true

  }

}
