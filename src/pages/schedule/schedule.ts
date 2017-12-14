import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, AlertController, Content } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { TimeModalPage } from '../time-modal/time-modal';
import { BookingDetailPage } from '../booking-detail/booking-detail';
import firebase from 'firebase';
import { HelpSchedulePage } from '../help-schedule/help-schedule';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})

export class SchedulePage {
  // course: FirebaseListObservable<any[]>;
  @ViewChild(Content) content: Content
  getSelectedRound: any[] = [];
  getBranchs: any;
  getCourseStu: any;
  selectCourse: any;
  bookHr = 0;
  balanceHr: number;
  branchId: any;
  schedule: any;
  getSchedule: any[]
  timer: any;
  amountTime: any = '';

  constructor(public dataTutor: DataTutorProvider,
    public alert: AlertController,
    public modal: ModalController,
    public angularfire: AngularFireDatabase,
    public tutor: DataTutorProvider,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public ViewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.dataTutor.getBranchs().subscribe(data => {
      this.getBranchs = data
    });

    this.dataTutor.getSchedule().subscribe(data => {
      this.getSchedule = data;
    })

    this.dataTutor.getCourseStuByStuId(
      this.dataTutor.studentData.studentId)
      .subscribe(data => {
        this.getCourseStu = data
      })
    this.timer = this.dataTutor.getCourseStudent()
  }

  showTime() {
    for (let i = 0; i < this.getCourseStu.length; i++) {
      if (this.getCourseStu[i].$key == this.selectCourse) {
        console.log('if')
        console.dir(this.getCourseStu[i])
        this.amountTime = this.getCourseStu[i].amountHr;
        this.content.resize()
        break;
      }
    }
  }

  selectRound(branchId) {
    if (branchId == undefined) {
      let alert = this.alert.create({
        title: 'กรุณาเลือกสาขาที่ต้องการจอง',
        buttons: ['ตกลง']
      })
      alert.present();
    } else {
      let modal = this.modal.create(TimeModalPage, { branchId });
      modal.onDidDismiss(data => {
        this.getSelectedRound = data;
        if (this.getSelectedRound != null) {
          this.getSelectedRound.sort();
        }
        console.log(this.getSelectedRound)
      });
      modal.present()
    }
  }

  showSelectedHr() {
    if (this.getSelectedRound)
      this.bookHr = this.getSelectedRound.length / 2;
    return this.bookHr;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
    this.ViewCtrl.setBackButtonText('');
  }

  confirm() {
    let alert = this.alert.create({
      subTitle: 'คุณยืนยันที่จะจองใช่ไหม',
      buttons: [{
        text: 'แน่ใจ',
        role: 'confirm',
        handler: () => {
          this.addHistory();
          this.updateHr();
          this.updateSeat();
        }
      },
      {
        text: 'ยกเลิก',
        role: 'Cancel'
      }]
    })
    alert.present();
  }

  updateSeat() {
    let updateSeat: any[] = [];
    for (let i = 0; i < this.getSchedule.length - 1; i++) {
      if (this.getSchedule[i].$key == this.branchId) {
        let Branch = this.getSchedule[i]
        console.log(Branch)
        for (let j = 0; j < Branch.length; j++) {
          for (let k = 0; k < this.getSelectedRound.length; k++) {
            if (Branch[j].time == this.getSelectedRound[k]) {
              Branch[j].seat = ((+Branch[j].seat) - 1)
            }
          }
        }
        this.dataTutor.getSchedule().update(Branch.$key, Branch)
        console.dir('updateSeat : ' + Branch.$key);
      }
    }
  }

  updateHr() {
    let bookHr = this.getSelectedRound.length / 2;

    if (this.getSelectedRound.length > 0) {
      firebase.database().ref(this.dataTutor.courseStudentPath + this.selectCourse)
        .once('value')
        .then(data => {
          let courseStu = data.val();
          if (courseStu.amountHr - bookHr < 0) {
            let alert = this.alert.create({
              title: 'ชั่วโมงคงเหลือไม่เพียงพอ',
              buttons: ['ตกลง']
            })
            alert.present();
          } else {
            this.dataTutor.getCourseStudent().update(this.selectCourse, {
              amountHr: courseStu.amountHr - bookHr
            });
          }
        })
    } else {
    }
  }

  addHistory() {
    firebase.database().ref(this.dataTutor.courseStudentPath + this.selectCourse)
      .once('value')
      .then(data => {
        let courseStu = data.val();
        let status = 'Not Study'
        let stuid_status = '';
        let studentId =this.dataTutor.studentData.studentId;
        this.dataTutor.getHistory().push({
          studentId: studentId,
          round: this.getSelectedRound,
          bookHr: this.getSelectedRound.length / 2,
          courseId: courseStu.courseId,
          date: this.dataTutor.getCurrentDate(),
          time: this.dataTutor.getCurrentTime(),
          keyCourse: this.selectCourse,
          branchId: this.branchId,
          status:status,
          stuid_status : studentId+'_'+status

        });
        this.navCtrl.pop();
      }).catch(er => {
        let alert = this.alert.create({
          subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          buttons: ['ตกลง']
        })
        alert.present();
      })

  }

  tutorial() {
    let modal = this.modalCtrl.create(HelpSchedulePage);
    modal.present();
  }



}
