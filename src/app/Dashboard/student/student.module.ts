import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { StudentCourseSelectionComponent } from './student-course-selection/student-course-selection.component';
import { StudentExamPanelComponent } from './student-exam-panel/student-exam-panel.component';
import { StudentExamQuestionListComponent } from './student-exam-question-list/student-exam-question-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentService } from './Services/student.service';
import { CdTimerModule } from 'angular-cd-timer';
import {HttpClientModule} from '@angular/common/http';
import { TimerFormatPipe } from './Pipe/timer-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    StudentComponent,
    StudentCourseSelectionComponent,
    StudentExamPanelComponent,
    StudentExamQuestionListComponent,
    TimerFormatPipe
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    AngularMaterialModule,
    SharedModule,
    CdTimerModule,
    HttpClientModule,NgxPaginationModule



  ],
  providers:[StudentService]
})
export class StudentModule {

}
