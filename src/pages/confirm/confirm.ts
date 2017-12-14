import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { from } from 'rxjs/observable/from';
// import {} from
/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  paymentDetail: any;
  studentId: any;
  courseStudent: any = { studentId: '', CourseName: '', courseId: '', registDate: '', subjName: '', amountHr: '' };

  constructor(public alert: AlertController,
    public angularFire: AngularFireDatabase,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {

    this.paymentDetail = this.navParams.data;
    this.studentId = this.dataTutor.studentData.studentId;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    this.viewCtrl.setBackButtonText('');
  }

  confirmPayment() {
    this.addCourseStudent();
    let status = 'already';
    let payDate = this.dataTutor.getCurrentDate();
    let payTime = this.dataTutor.getCurrentTime();
    let stuid_status = this.studentId + '_' + status;
    this.dataTutor.getPayment().update(this.paymentDetail.$key,
      {
        payTime: payTime,
        payDate: payDate,
        status: status,
        stuid_status: stuid_status
      }
    ).then(() => {
      let alert = this.alert.create({
        title: 'ชำระเงินเรียบร้อย',
        subTitle: 'คุณชำระเงินเรียบร้อย',
        buttons: ['เรียบร้อย']
      })
      alert.present();
      this.navCtrl.parent.select(3);
    });

  }

  addCourseStudent() {
    this.courseStudent.studentId = this.paymentDetail.studentId;
    this.courseStudent.CourseName = this.paymentDetail.CourseName;
    this.courseStudent.courseId = this.paymentDetail.courseId;
    this.courseStudent.registDate = this.paymentDetail.registDate;
    this.courseStudent.subjName = this.paymentDetail.subjName;
    let getHourByCourseId = this.angularFire.list(this.dataTutor.coursePath, {
      query: {
        orderByKey: true,
        equalTo: this.paymentDetail.courseId
      }
    });
    getHourByCourseId.forEach(item => {
      let Hr = Object.keys(item).map(key => item[key]);
      this.courseStudent.amountHr = Hr[0].hour;
      this.dataTutor.getCourseStudent().push(this.courseStudent);
    });
    console.log('Hello');
  }

}
