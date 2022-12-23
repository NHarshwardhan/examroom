import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourseName } from './../../student/Interface/icourse-name';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from 'src/app/Intefaces/ilogin';
import { IApprovedStudent } from './../Interfaces/iapproved-student';
import { IPaperInfo } from './../../student/Interface/ipaper-info';
import { ICourseList } from './../Interfaces/icourse-list';

@Injectable()

export class AdminService {

  studentListAPi = 'https://examhall.onrender.com/api/user';
  paperApi = 'https://examhall.onrender.com/api/papers';
  courseListApi = 'https://examhall.onrender.com/api/courses';

  approvedStudentAPi = 'https://examhall.onrender.com/api/approvedStudent';


  constructor(private http:HttpClient) { }

  getCourseList():Observable<ICourseName[]>{
    return this.http.get<ICourseName[]>(this.courseListApi)
  }
  getStudentList():Observable<ILogin[]>{
    return this.http.get<ILogin[]>(this.studentListAPi)
  }
  getApprovedStudent(id:string|undefined):Observable<IApprovedStudent[]>{
    return this.http.get<IApprovedStudent[]>(`${this.approvedStudentAPi}/${id}`)
  }
  AddStudentExam(studentexamdata:IApprovedStudent):Observable<IApprovedStudent>{
    return this.http.post<IApprovedStudent>(
        `${this.approvedStudentAPi}`,
        studentexamdata,
        {
          headers: new HttpHeaders({'content-type':'application/json'})
        }
    )
  }
  UpdateStudentExam(studentexamdata:IApprovedStudent):Observable<IApprovedStudent>{
    return this.http.put<IApprovedStudent>(
        `${this.approvedStudentAPi}/${studentexamdata._id}`,
        studentexamdata,
        {
          headers: new HttpHeaders({'content-type':'application/json'})
        }
    )
  }

  saveQuestionToDB(paper:any,course:string):Observable<IPaperInfo>{
    return this.http.post<IPaperInfo>(
       `${this.paperApi}/${course}`,
       paper,
       {
         headers: new HttpHeaders({'content-type':'application/json'})
       }

    )
  }

  saveCourseDetailsToDB(courseInfo:ICourseList):Observable<ICourseList>{
    return this.http.post<ICourseList>(
       this.courseListApi,
       courseInfo,
       {
         headers: new HttpHeaders({'content-type':'application/json'})
       }
    )
  }
}
