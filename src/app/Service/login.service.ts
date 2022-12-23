import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILogin ,IUserLogin} from '../Intefaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userrole = 'admin';
  loginUserRole:string|null=null;
  userEmail = ''

  loginApi = "http://localhost:3000/users"
  loginApiWithJWT = 'https://examhall.onrender.com/api/user/login'
  registerApiWithJWT = 'https://examhall.onrender.com/api/user/register'


  constructor(private http:HttpClient, private router:Router){}


  isAuthenticateUser():Observable<ILogin[]>{
     return this.http.get<ILogin[]>(this.loginApi)
  }

  storeUserRole(role:string,email:string){
      this.loginUserRole = role
      this.userEmail = email
      sessionStorage.setItem('email',this.userEmail)
  }

  //Later use :  code to remove login from component to service
  checkUserIsExist(loginData:ILogin){

  }
  isLoggedIn(){
    //  return this.loginUserRole
    return sessionStorage.getItem('role')
  }

  logout(){
    // this.loginUserRole=null
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    alert('Logout successfully')
    this.router.navigate(['login'])

  }

  registerAccount(registerData:ILogin): Observable<ILogin>{
     return this.http.post<ILogin>(
              this.registerApiWithJWT,
              registerData,
              {
                headers: new HttpHeaders({"content-type":"application/json"})
              }
          )
  }


// -----------NEW METHOD----------------
 loginProcess(loginInfo:IUserLogin):Observable<IUserLogin>{
     return this.http.post<IUserLogin>(
         this.loginApiWithJWT,
         loginInfo,
         {
           headers:new HttpHeaders({'content-type':'application/json'})
         }

     )
 }
}
