import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwIfEmpty } from 'rxjs';
import { StudentService } from '../Services/student.service';

import { IPaperInfo } from './../Interface/ipaper-info';

import { Router } from '@angular/router';
import { ICourseName } from '../Interface/icourse-name';
import { IUserAnswered } from '../Interface/iuser-answered';

@Component({
  selector: 'app-student-exam-panel',
  templateUrl: './student-exam-panel.component.html',
  styleUrls: ['./student-exam-panel.component.css'],
})
export class StudentExamPanelComponent implements OnInit, OnDestroy {
  selectedCourse = '';
  isDisablePanel = true;
  showLoadingPage = false;
  startExam = true;
  currentDate = new Date()
  examName: ICourseName | undefined = undefined;
  testName: string| undefined = ''
  loadingColor = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ];
  countDown: any;
  counter: number = 1;
  tick = 1000;
  examPaper: IPaperInfo[] = [];
  // Pagination Parameter
  questionnumber = 1;
  selectedAnswer = '';
  userAnswered: IUserAnswered[] = [];
  // Answer Preview
  totalItems = 0;
  unseenItems = 0;
  answeredItems = 0;
  reviewItems = 0;
  markReviewItems = 0;
  onButtonQuesOPenSetAnswer = '';
  totalScore = 0;
  scoreStatus = false
  email: string|null=''
  constructor(private stdService: StudentService, private router: Router) {  }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email')
    this.stdService.coursename.subscribe({
      next: (course) => {


        this.selectedCourse = course;

        this.getCourseDureation();
        this.getExamPaper();
        this.setDisablePanel();
        this.answeredItems = this.userAnswered.filter((answerList) => answerList.answerBtn == true).length;
        this.markReviewItems = this.userAnswered.filter((answerList) => answerList.review == true).length;

      },
    });
    this.countDown = this.stdService.getCounter(this.tick).subscribe({
      next: () => {
        if (this.counter == 0) {
          //  this.TimeUpSubmitExam()
          //after submit redirect to see the result
          this.ngOnDestroy();
        } else {
          this.counter--;
        }
      },
    });
  }

  getCourseDureation() {
    this.stdService.getCourseName().subscribe({
      next: (response: ICourseName[]) => {


        this.examName = response.find(
          (res: ICourseName) => res.coursekey === this.selectedCourse
        );
        this.testName = this.examName?.coursename
        let examdurationinhrformat = this.examName ? this.examName.duration : 1;
        this.counter = examdurationinhrformat * 3600;
      },
    });
  }

  getExamPaper() {

     if(this.selectedCourse){
      this.stdService.getExamPaper(this.selectedCourse).subscribe({
        next: (response: IPaperInfo[]) => {
           this.showLoadingPage = false;
            this.examPaper = response;

            this.totalItems = this.examPaper.length;
            this.unseenItems = this.examPaper.length - this.userAnswered.length;
          // }
        },
        error: (reason) => {
          alert(reason.message);
        },
      });
     }

  }
  setDisablePanel() {
    //  setTimeout(()=>{

    //  },3000)
    this.isDisablePanel = this.selectedCourse ? false : true;
    // console.log(this.isDisablePanel)
  }

  onButton_Answer_Review_Click(
    answer: boolean,
    review: boolean,
    QuesId: number
  ) {

    let answerData = this.answeredItems + 1;
    let reviewData = this.markReviewItems + 1;


    if (answerData >= this.totalItems || reviewData >= this.totalItems ) {

      if (confirm('Are You Sure to Submit ?')) {
        //submit
        this.finalSubmit();
      } else {
        if (this.unseenItems != 0) {
          this.userAnswered.push({
            Qid: this.questionnumber,
            Answer: this.selectedAnswer,
            answerBtn: answer,
            review: review,
          });
          this.getAnswerDetails();
        }

        if (answer === true || review ==true) {

          let foundQuestion: IUserAnswered | undefined = this.userAnswered.find(
            (ua) => ua.Qid === QuesId
          );
          if (foundQuestion) {
             if(answer){
              foundQuestion.answerBtn = true;
              foundQuestion.review = false;
              foundQuestion.Answer = this.selectedAnswer;
             }
             else{
              foundQuestion.answerBtn = false;
              foundQuestion.review = true;
              foundQuestion.Answer = this.selectedAnswer;
             }

          }
          this.getAnswerDetails();

        }
      }
    } else if (this.selectedAnswer != '') {
      this.userAnswered.push({
        Qid: this.questionnumber,
        Answer: this.selectedAnswer,
        answerBtn: answer,
        review: review,
      });
      this.questionnumber = this.questionnumber + 1;
      this.getAnswerDetails();
    } else {
      alert('Please select an Option');
    }

  }

  getAnswerDetails() {
    this.totalItems = this.examPaper.length;
    this.unseenItems = this.examPaper.length - this.userAnswered.length;
    this.answeredItems = this.userAnswered.filter(
      (answerList) => answerList.answerBtn == true
    ).length;
    this.markReviewItems = this.userAnswered.filter(
      (answerList) => answerList.review == true
    ).length;
  }

  onRadioButtonChange(event: any) {
    this.selectedAnswer = event.target.value;
  }

  QuestionOpenWithButton(Quesidparam: number){
        let foundRecord = this.userAnswered.find((uA)=> uA.Qid ===Quesidparam )
        if(foundRecord){
          this.onButtonQuesOPenSetAnswer = foundRecord?.Answer
        }
        this.questionnumber = Quesidparam
  }


  finalSubmit() {
    //Calculate Score
    // if(confirm('Are you sure to submit ?')){
    //   this.deleteUserExamInfo()
    //   alert('Thank you');
    //   sessionStorage.removeItem('role');
    //   sessionStorage.removeItem('email');

    //   this.router.navigate(['login']);
    // }
    // else{

    // }

      console.log(this.examPaper)
      console.log(this.userAnswered)

      this.examPaper.map(paper=>{

            let foundQuestion =   this.userAnswered.find(uA=>uA.Qid === paper.Qid)
            if(foundQuestion){
                 if(foundQuestion.Answer === paper.Answer){
                     console.log(`Question${paper.Qid} = Correct`)
                     this.totalScore+=1
                 }
                 else{
                     console.log(`Question${paper.Qid} = Wrong`)
                 }
            }


      })
      this.scoreStatus = true
      // this.stdService.coursename.next('');
  }

  deleteUserExamInfo(){
      /*
         Delete exam info of current user
         and get score page and display score
      */
  }
  downloadReport(){
     alert("BUY ME COFFEE")
  }

  ngOnDestroy() {
    this.stdService.coursename.next(null);
    this.countDown.unsubscribe();

  }
}
