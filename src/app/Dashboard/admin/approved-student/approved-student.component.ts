import { Component, OnInit } from '@angular/core';
import { AdminService } from './../Services/admin.service';
import { ICourseName } from './../../student/Interface/icourse-name';
import { ILogin } from './../../../Intefaces/ilogin';
import { IApprovedStudent } from './../Interfaces/iapproved-student';

@Component({
  selector: 'app-approved-student',
  templateUrl: './approved-student.component.html',
  styleUrls: ['./approved-student.component.css']
})
export class ApprovedStudentComponent implements OnInit {

  coursename: ICourseName[] = [];
  students: ILogin[] = [];
  selectedCourse:ICourseName| undefined;
  selectedStudent:IApprovedStudent | undefined;
  addExamToSudentStatus = false
  isLoading:boolean = true

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {

        this.getCourseList()
        this.getStudentList()


  }

  getCourseList(){
    this.adminService.getCourseList().subscribe({
      next:(response)=>{
           this.coursename = response
      },
      error:(reason)=>{
             console.log(reason)
      }
   })
  }
  getStudentList(){
    this.adminService.getStudentList().subscribe({
      next:(response)=>{

           this.students = response
           this.isLoading = false
      },
      error:(reason)=>{
             console.log(reason)
      }
   })
  }
  selectCourseByUser(){

  }
  selectStudentByAdmin(){

  }
  approveStudent(){
    //Check used exist in approved List
    console.log(this.selectedStudent)
    this.adminService.getApprovedStudent(this.selectedStudent!._id).subscribe({
       next:(response:any)=>{
         console.log(response)
         if(response){
             this.updateUserWithExamInfo()
         }
         else{
             this.createUserWithExamInfo()
         }

       },
       error:(reason)=>{

       }
    })




  }

  updateUserWithExamInfo(){
    if(this.selectedStudent && this.selectedCourse){
      this.selectedStudent.examkey = this.selectedCourse.coursekey
      this.selectedStudent.examname = this.selectedCourse.coursename

      this.adminService.UpdateStudentExam(this.selectedStudent).subscribe({
         next:(response)=>{
            this.addExamToSudentStatus = true
         },
         error:(reason)=>{
            alert(reason.message)
         }
      })
   }
   else{
      alert('Please select Student / Exam');
   }
  }
  createUserWithExamInfo(){
    if(this.selectedStudent && this.selectedCourse){
      this.selectedStudent.examkey = this.selectedCourse.coursekey
      this.selectedStudent.examname = this.selectedCourse.coursename

      this.adminService.AddStudentExam(this.selectedStudent).subscribe({
         next:(response)=>{
            this.addExamToSudentStatus = true
         },
         error:(reason)=>{
            alert(reason.message)
         }
      })
   }
   else{
      alert('Please select Student / Exam');
   }
  }
  clearStudent(){
      this.addExamToSudentStatus = false
      this.selectedCourse= undefined;
      this.selectedStudent= undefined
  }

}
