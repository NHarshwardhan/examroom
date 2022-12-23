import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ApprovedStudentComponent } from './approved-student/approved-student.component';
import { AdminService } from './Services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './../../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { AddCourseComponent } from './add-course/add-course.component';

@NgModule({
  declarations: [
    AdminComponent,
    ApprovedStudentComponent,
    AdminDashboardComponent,
    UploadQuestionComponent,
    AddCourseComponent
  ],
  imports: [
CommonModule,
    AdminRoutingModule,HttpClientModule,
    AngularMaterialModule,
    FormsModule,ReactiveFormsModule
  ],
  providers:[AdminService]
})
export class AdminModule {

 }
