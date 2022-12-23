import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserLogin } from 'src/app/Intefaces/ilogin';
import { LoginService } from 'src/app/Service/login.service';
import { IApprovedStudent } from './../../Dashboard/admin/Interfaces/iapproved-student';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoggedIn: boolean = false
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }




 loginProcess(){
    this.isLoggedIn  = true
    this.loginService.loginProcess(this.loginForm.value).subscribe({
      next:((response:any)=>{
        this.isLoggedIn  = false
        const userRole =  this.decryptRole(response.role)
        if(userRole==='student'){
              sessionStorage.setItem('role',response.role)
              sessionStorage.setItem('token',response.token)
              sessionStorage.setItem('email',response.email)
              this.router.navigate(['student']);
        }
        else if(userRole==='admin'){
              sessionStorage.setItem('role',response.role)
              sessionStorage.setItem('token',response.token)
              sessionStorage.setItem('email',response.email)
              this.router.navigate(['admin']);
        }
        else{
             alert('Invalid User')
        }

      }),
      error:(reason)=>{
         alert(reason.error)
      }

    })
 }

 decryptRole(ciphertext:string){
  const passphrase = 'djfurh2323239!@#$$XZSSE#';
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
 }
}

