import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { ApprovedStudentComponent } from './approved-student/approved-student.component';
import { AuthGuard } from './Guard/auth.guard';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { AddCourseComponent } from './add-course/add-course.component';

const routes: Routes = [
  {
    path:'', component:AdminComponent,canActivate:[AuthGuard],
    children:[
       {path:'', component:AdminDashboardComponent},
       {path:'approved', component:ApprovedStudentComponent},
       {path:'upload', component:UploadQuestionComponent},
       {path:'addcourse', component:AddCourseComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
