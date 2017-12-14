import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DataTutorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataTutorProvider {
  studentData: any;
  branchsPath: string = '/Branchs/';
  courseStudentPath: string = '/CourseStudent/';
  coursePath: string = '/Courses/';
  paymentPath: string = '/Payment/';
  schedulePath: string = '/Schedule/';
  keySchedule: string = '-KzVFGmQ3JT9CXvYXXlz/';
  studentsPath: string = '/Students/';
  subjectsPath: string = '/Subjects/';
  chatsPath: string = '/chats/';
  historyPath: string = '/History/';

  course: FirebaseListObservable<any[]>;
  branchs: FirebaseListObservable<any[]>;
  courseStudent: FirebaseListObservable<any[]>;
  payment: FirebaseListObservable<any[]>;
  schedule: FirebaseListObservable<any[]>;
  students: FirebaseListObservable<any[]>;
  subjects: FirebaseListObservable<any[]>;
  chats: FirebaseListObservable<any[]>;
  history: FirebaseListObservable<any[]>;

  studentChild: any = 'studentId';
  paymentChild: any = 'stuid_status'
  historyStudentStatus: any = 'stuid_status';
  courseChild: any = 'subjName';

  constructor(public http: Http,
    public angularfire: AngularFireDatabase,
    private storage: Storage) {

  }

  getBranchs(): FirebaseListObservable<any[]> {
    this.branchs = this.angularfire.list(this.branchsPath);
    return this.branchs;
  }

  getCourseStudent(): FirebaseListObservable<any[]> {
    this.courseStudent = this.angularfire.list(this.courseStudentPath);
    return this.courseStudent;
  }

  getCourse(): FirebaseListObservable<any[]> {
    this.course = this.angularfire.list(this.coursePath);
    return this.course;
  }

  getPayment(): FirebaseListObservable<any[]> {
    this.payment = this.angularfire.list(this.paymentPath);
    return this.payment;
  }

  getSchedule(): FirebaseListObservable<any[]> {
    this.schedule = this.angularfire.list(this.schedulePath + this.keySchedule);
    return this.schedule;
  }

  getStudents(): FirebaseListObservable<any[]> {
    this.students = this.angularfire.list(this.studentsPath);
    return this.students;
  }

  getSubjects(): FirebaseListObservable<any[]> {
    this.subjects = this.angularfire.list(this.subjectsPath);
    return this.subjects;
  }

  getChats(): FirebaseListObservable<any[]> {
    this.chats = this.angularfire.list(this.chatsPath);
    return this.chats;
  }

  getHistory(): FirebaseListObservable<any[]> {
    this.history = this.angularfire.list(this.historyPath);
    return this.history;
  }
  //queryByChildPayment
  getPaymentByStuidstatus(value): FirebaseListObservable<any[]> {
    this.payment = this.angularfire.list(this.paymentPath, {
      query: {
        orderByChild: this.paymentChild,
        equalTo: value
      }
    });
    return this.payment;
  }
  getHistoryByStuidstatus(value): FirebaseListObservable<any[]> {
    this.history = this.angularfire.list(this.historyPath, {
      query: {
        orderByChild: this.historyStudentStatus,
        equalTo: value
      }
    });
    return this.history;
  }
  //getCourseStuByStuId
  getCourseStuByStuId(value): FirebaseListObservable<any[]> {
    this.course = this.angularfire.list(this.courseStudentPath, {
      query: {
        orderByChild: this.studentChild,
        equalTo: value
      }
    })
    return this.course;
  }

  getCourseStuByKey(value): FirebaseListObservable<any[]> {
    this.courseStudent = this.angularfire.list(this.courseStudentPath, {
      query: {
        orderByKey: true,
        equalTo: value
      }
    })
    return this.courseStudent;
  }

  querySubjByKey(value) {
    this.subjects = this.angularfire.list(this.subjectsPath, {
      query: {
        orderByKey: true,
        equalTo: value
      }

    })
  }

  getScheduleByBranchId(branchId): FirebaseListObservable<any[]> {
    this.schedule = this.angularfire.list(this.schedulePath + this.keySchedule + branchId);
    return this.schedule;
  }

  queryCourseById(courseId) {
    this.course = this.angularfire.list(this.coursePath, {
      query: {
        orderByKey: true,
        equalTo: courseId
      }
    });
  }

  getHistoryByStudentId(studentId): FirebaseListObservable<any[]> {
    this.history = this.angularfire.list(this.historyPath, {
      query: {
        orderByChild: this.studentChild,
        equalTo: studentId
      }
    })
    return this.history;
  }

  getCurrentDate() {
    let currentDate = new Date().toLocaleDateString();
    return currentDate;
  }

  getCurrentTime() {
    let hh = new Date().getHours();
    let mm = new Date().getMinutes();
    let ss = new Date().getSeconds();
    let currentTime = hh + '.' + mm + '.' + ss;
    return currentTime;
  }

  getHistoryByHitoryId(historyId): FirebaseListObservable<any[]> {
    this.history = this.angularfire.list(this.historyPath, {
      query: {
        orderByKey: true,
        equalTo: historyId
      }
    })
    return this.history;
  }

  getCourseBySubjName(subjName): FirebaseListObservable<any[]> {
    this.course = this.angularfire.list(this.coursePath, {
      query: {
        orderByChild: this.courseChild,
        equalTo: subjName
      }
    })
    return this.course;
  }

  getCurrentTimeNoSec() {
    let hh = new Date().getHours();
    let mm = new Date().getMinutes();
    let currentTime = hh + '.' + mm;
    return currentTime;
  }

  parseIntSubStrHourCurrentTimeforCheck():number {
    return parseInt(this.getCurrentTimeNoSec().substr(0, 2));
  }

  parseIntSubStrMinuteCurrentTimeforCheck():number {
    return parseInt(this.getCurrentTimeNoSec().substr(
      this.getCurrentTimeNoSec().indexOf('.') + 1,
      this.getCurrentTimeNoSec().length - 1)
    )
  }
}




