import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAuthGuard } from './Guard/student-auth.guard';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {path:'', component:StudentComponent,canActivate:[StudentAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
