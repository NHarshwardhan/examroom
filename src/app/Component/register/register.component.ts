import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILogin } from 'src/app/Intefaces/ilogin';
import { LoginService } from 'src/app/Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  isRegister:boolean = false
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl('student')
    });
  }

  registerProcess(){
    this.isRegister = true
    this.loginService.registerAccount(this.registerForm.value).subscribe({
        next:()=>{
               this.isRegister = false
               alert('User Registered Successfully')
               this.router.navigate(['/login']);
               this.registerForm.reset();
        },
        error:(reason)=>{
            alert(reason.message)
        }
    })
  }


}
