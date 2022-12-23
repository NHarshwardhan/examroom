import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',loadChildren:()=>import('./Dashboard/admin/admin.module').then(m=> m.AdminModule)},
  {path:'student',loadChildren:()=>import('./Dashboard/student/student.module').then(m=> m.StudentModule)},
  {path:'**', component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
