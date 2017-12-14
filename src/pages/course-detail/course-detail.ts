import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { ConfirmPage } from '../../pages/confirm/confirm';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PaymentPage } from '../payment/payment';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the CourseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course-detail',
  templateUrl: 'course-detail.html',
})
export class CourseDetailPage {

  schedule: FirebaseListObservable<any[]>;
  studentId: any;

  courseDetail: any;
  // getSubject: FirebaseListObservable<any[]>;
  paymentList: FirebaseListObservable<any[]>;
  payment: any = { stuid_status: '', price: '', CourseName: '', subjName: '', payTime: '', payDate: '', registDate: '', studentId: '', status: 'wait', courseId: '' };

  constructor(public alert: AlertController,
    public angularFire: AngularFireDatabase,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {

    this.studentId = this.dataTutor.studentData.studentId;
    this.courseDetail = this.navParams.data;
    // this.getSubject = angularFire.list('/Subjects/', {
    //   query: {
    //     orderByKey: true,
    //     equalTo: this.courseDetail.subjId
    //   }
    // });

    console.log(this.courseDetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CourseDetailPage');
    this.viewCtrl.setBackButtonText('');
  }

  Confirm() {
    let alert = this.alert.create({
      title: 'ยืนยันการสมัคร',
      subTitle: 'คุณยืนยันที่จะสมัครเรียนใช่ไหม',
      buttons: [
        {
          text: 'ยืนยัน',
          role: 'confirm',
          handler: () => {

            this.addPayment();
            let alert = this.alert.create({
              title: 'ชำระเงิน',
              subTitle: 'คุณต้องการที่จะชำระเงินตอนนี้หรือไม่',
              buttons: [
                {
                  text: 'ไว้ภายหลัง',
                  role: 'After',
                  handler: () => {
                    let alert = this.alert.create({
                      title: 'สมัครเรียบร้อย',
                      subTitle: 'คุณสมัครเรียนเรียบร้อย สามารถชำระเงินภายหลังที่หน้าชำระเงินด้านล่าง',
                      buttons: ['เรียบร้อย']
                    })
                    alert.present();
                    this.navCtrl.pop();
                  }
                },
                {
                  text: 'ชำระเงิน',
                  role: 'Pay',
                  handler: () => {
                    this.navCtrl.pop();
                    this.navCtrl.parent.select(3);
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();

  }

  addPayment() {
    this.payment.courseId = this.courseDetail.$key;
    this.payment.CourseName = this.courseDetail.CourseName;
    this.payment.price = this.courseDetail.price;
    this.payment.subjName = this.courseDetail.subjName;
    this.payment.registDate = this.getCurrentDate();
    //ก่อน add payment ต้องเก็บค่า stuId ก่อน
    this.payment.studentId = this.studentId;
    this.payment.stuid_status = this.payment.studentId + '_' + this.payment.status;
    this.dataTutor.getPayment().push(this.payment);
  }

  getCurrentDate() {
    let currentDate = new Date().toLocaleDateString();
    return currentDate;
  }
}
