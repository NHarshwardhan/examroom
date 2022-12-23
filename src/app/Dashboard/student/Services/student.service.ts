import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IPaperInfo } from './../Interface/ipaper-info';
import {map,filter} from 'rxjs/operators'
import { ICourseName } from '../Interface/icourse-name';
import { LoginService } from 'src/app/Service/login.service';
import { IApprovedStudent } from './../../admin/Interfaces/iapproved-student';

@Injectable()

export class StudentService {

  coursename = new BehaviorSubject<any>('');

  paperApi = 'https://examhall.onrender.com/api/papers';
  coursenameApi = 'https://examhall.onrender.com/api/courses';

  approvedStudentAPi = 'https://examhall.onrender.com/api/approvedStudent';

  constructor(private http:HttpClient) {

  }


  getCourseName():Observable<ICourseName[]>{
     return this.http.get<ICourseName[]>(this.coursenameApi)
  }

  //Countdown timer
  getCounter(tick:number) {
    return timer(0, tick);
  }

  getExamPaper(examName:string):Observable<IPaperInfo[]>{
    return this.http.get<IPaperInfo[]>(`${this.paperApi}/${examName}`)
  }
  getStudentWithExamInfo():Observable<IApprovedStudent[]>{
    return this.http.get<IApprovedStudent[]>(`${this.approvedStudentAPi}`)
  }

  deleteApprovalExamInfo(){

  }

}
