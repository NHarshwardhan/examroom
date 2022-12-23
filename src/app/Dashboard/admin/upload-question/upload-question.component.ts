import { Component, OnInit } from '@angular/core';
import { ICourseName } from '../../student/Interface/icourse-name';
import { AdminService } from '../Services/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-question',
  templateUrl: './upload-question.component.html',
  styleUrls: ['./upload-question.component.css']
})
export class UploadQuestionComponent implements OnInit {
  coursename: ICourseName[] = [];
  selectedCourse: ICourseName | undefined
  mcqFile: File | undefined = undefined
  uploadStatus:boolean=false
  isLoading = true
  constructor(private adminService:AdminService) { }


  ngOnInit(): void {
    this.getCourseList()
  }

  getCourseList(){
    this.adminService.getCourseList().subscribe({
      next:(response)=>{
           this.coursename = response
           this.isLoading = false
      },
      error:(reason)=>{

      }
   })
  }

  selectCourseByUser(){

  }
  uploadCourse(){
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(this.mcqFile as File)
    fileReader.onload = (event:any)=>{
       let binaryData = event.target.result
       let workbook = XLSX.read(binaryData,{type:'binary'})
       workbook.SheetNames.forEach(sheet=>{
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
          const jsonstringdata = JSON.stringify(data)
          this.saveQuestion(jsonstringdata)

       })

    }

  }

  saveQuestion(questions:any){
      this.adminService.saveQuestionToDB(questions,this.selectedCourse!.coursekey)
          .subscribe({
            next:(response:any)=>{
               this.uploadStatus = true
            },
            error:(reason)=>{
              console.log(reason)
            }
          })
  }

  onFileChange(event:any){
   this.mcqFile = event.target.files[0]

  }
  clearStudent(){
    this.uploadStatus = false
    this.selectedCourse= undefined;
    this.mcqFile = undefined
 }
}
