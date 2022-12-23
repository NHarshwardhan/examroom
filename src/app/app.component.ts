import { Component } from '@angular/core';
import { LoginService } from './Service/login.service';
import { StudentService } from './Dashboard/student/Services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent  {
  title = 'examinationhall';
  email = '';
  constructor(public loginService:LoginService){}



  getEmail(){
    return sessionStorage.getItem('email')
  }
}
