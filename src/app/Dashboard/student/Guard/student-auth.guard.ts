import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    /* if(this.loginService.loginUserRole!=='student'){
      alert('You are not Authorized, please login')
      this.router.navigate(['login'])
      return false
      }   
     return true */

     if(!this.loginService.isLoggedIn()){
      alert('You are not Authorized, please login')
      this.router.navigate(['login'])
      return false
      }   
     return true
  }
  
}
