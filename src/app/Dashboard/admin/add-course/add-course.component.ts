import { Component, OnInit } from '@angular/core';
import { ICourseList } from './../Interfaces/icourse-list';
import { FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../Services/admin.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseInfo:FormGroup = new FormGroup({})
  courseAddStatus:boolean = false
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
     this.courseInfo = new FormGroup({
           coursekey: new FormControl(),
           coursename: new FormControl(),
           duration: new FormControl()
     })
  }
  saveCourse(){
    this.adminService.saveCourseDetailsToDB(this.courseInfo.value)
         .subscribe({
           next:(response)=>{
              this.courseAddStatus = true
           },
           error:(reason)=>{
               console.log(reason)
           }
         })
  }
  clearCourse(){
    this.courseInfo.reset()
    this.courseAddStatus = false
  }
}
