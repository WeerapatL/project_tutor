import { ViewChild, Component } from '@angular/core';
import { Content, NavController, NavParams, ViewController, ItemSliding, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { TimePopoverPage } from '../time-popover/time-popover';
import { HelpHistoryPage } from '../help-history/help-history';

/**
 * Generated class for the CancelBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cancel-book',
  templateUrl: 'cancel-book.html',
})
export class CancelBookPage {
  @ViewChild(Content) content: Content
  getHistory: any;
  getHistoryCheckStatus: any;
  // getHistoryCheck: any;
  getCourse: any;
  getCourseStu: any;
  getBranch: any;
  getBranchStudy: any;
  selectedTab = "wait";
  getAlready: any;
  getWait: any;
  status: string;
  ready: string = 'Already';
  notStudy: string = 'Not Study';

  constructor(public dataTutor: DataTutorProvider,
    public angularFire: AngularFireDatabase,
    public ViewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popover: PopoverController,
    public alert: AlertController,
    public modalCtrl: ModalController) {

    dataTutor.getHistoryByStudentId(dataTutor.studentData.studentId).subscribe(data => {
      this.getHistory = data
    });
    dataTutor.getCourse().subscribe(data => {
      this.getCourse = data
    });
    //ของปอม
    dataTutor.getSchedule().subscribe(data => {
      this.getBranch = data
    });

    dataTutor.getBranchs().subscribe(data => {
      this.getBranchStudy = data
    });

    this.getWait = this.dataTutor.getHistoryByStuidstatus(dataTutor.studentData.studentId + '_' + this.notStudy);
    this.getAlready = this.dataTutor.getHistoryByStuidstatus(dataTutor.studentData.studentId + '_' + this.ready);
  }

  ionViewDidLoad() {
    console.log('Cancel Book Page');
    this.ViewCtrl.setBackButtonText('');
  }

  showCourseName(courseId) {
    let courseName: any;
    for (let i = 0; i < this.getCourse.length; i++) {
      if (this.getCourse[i].$key == courseId) {
        courseName = this.getCourse[i].CourseName
      }
    }
    return courseName;
  }

  showSubjectName(courseId) {
    let subjectName: any;
    for (let i = 0; i < this.getCourse.length; i++) {
      if (this.getCourse[i].$key == courseId) {
        subjectName = this.getCourse[i].subjName
      }
    }
    return subjectName;
  }
  showBranchName(branchId) {
    let branchName: any;
    for (let i = 0; i < this.getBranchStudy.length; i++) {
      if (this.getBranchStudy[i].$key == branchId) {
        branchName = this.getBranchStudy[i].branchName;
      }
    }
    return branchName;
  }

  popoverTime(myEvent, slidingItem, round) {
    let popover = this.popover.create(TimePopoverPage, { round });
    popover.onDidDismiss(data => {
      slidingItem.close();
    })
    popover.present({
      ev: myEvent
    });

  }

  cancel(slidingItem: ItemSliding, hist) {
    let keyCourse = hist.keyCourse;
    let returnHr = hist.bookHr;
    let keyHist = hist.$key;
    let round = hist.round;
    let branchId = hist.branchId;

    if (!this.checkStatusCancelBefore30min(round)) {
      let alert = this.alert.create({
        subTitle: 'กรุณายกเลิกก่อนเวลาเรียน 30 นาทีค่ะ',
        buttons: [{
          text: 'ตกลง',
          role: 'ok',
          handler: () => {
            slidingItem.close();
          }
        }]
      })
      alert.present();
    } else {
      let alert = this.alert.create({
        title: 'ยกเลิกการจอง',
        subTitle: 'คุณต้องการยกเลิกการจองนี้ใช่ไหม',
        buttons: [{
          text: 'แน่ใจ',
          role: 'confirm',
          handler: () => {


            this.returnSeat(round, branchId);
            this.returnHr(keyCourse, returnHr);
            this.dataTutor.getHistory().remove(keyHist);

            slidingItem.close();
          }

        }, {
          text: 'ยกเลิก',
          role: 'cancel'
        }]
      })
      alert.present();
    }
  }

  returnHr(key, returnHr) {
    let updateHr = 0;
    this.dataTutor.getCourseStuByKey(key).subscribe(data => {
      this.getCourseStu = data;
      updateHr = this.getCourseStu[0].amountHr + returnHr
    })

    let interval = setInterval(() => {
      if (updateHr != 0) {
        clearInterval(interval);
        this.dataTutor.getCourseStudent().update(key,
          {
            amountHr: updateHr
          })
      }
    })
  }

  returnSeat(roundHist, branchId) {
    for (let j = 0; j < this.getBranch.length; j++) {
      if (this.getBranch[j].$key == branchId) {
        let getRound = this.getBranch[j];
        for (let k = 0; k < getRound.length; k++) {
          for (let i = 0; i < roundHist.length; i++) {
            if (getRound[k].time == roundHist[i]) {
              console.log('key is ' + getRound[k])
              this.dataTutor.getSchedule().update(branchId + '/' + [k], { seat: getRound[k].seat + 1 });
            }
          }
        }
      }
    }
  }

  checkStatusCancelBefore30min(round) {
    let currentTime: string;
    let hrCurrentTime: number;
    let mnCurrentTime: number;
    let hrRoundTime: number;
    let mnRoundTime: number;
    let statusBefore30min: boolean;
    currentTime = this.dataTutor.getCurrentTimeNoSec();
    hrCurrentTime = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
    mnCurrentTime = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
    let roundTime: any;
    for (let i = 0; i < round.length; i++) {
      roundTime = round[0];
      break;
    }
    hrRoundTime = parseInt(roundTime.substr(0, 2));
    mnRoundTime = parseInt(roundTime.substr(roundTime.indexOf('.') + 1, 2));
    if (hrRoundTime - hrCurrentTime > 1) {
      statusBefore30min = true;
    } else if (hrRoundTime - hrCurrentTime == 0 && mnRoundTime - mnCurrentTime >= 30) {
      statusBefore30min = true;
    } else if (hrRoundTime - hrCurrentTime == 1 && mnRoundTime - mnCurrentTime >= -30) {
      statusBefore30min = true;
    } else {
      statusBefore30min = false;
    }

    return statusBefore30min;
  }

  updateStatusToFirebase() {
    let historytList = this.getHistory;
    let rounds = [];
    let date = [];
    for (let i = 0; i < historytList.length; i++) {
      rounds[i] = historytList[i].round[0];
      date[i] = historytList[i].date;
      if (this.checkCurrentDateAndHistDate(date[i])) {
        if (this.checkAlreadyOrNotStudy(rounds[i])) {
          this.dataTutor.getHistory().update(this.getHistory[i].$key, {
            status: this.status,
            stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
          })
        } else {
          this.dataTutor.getHistory().update(this.getHistory[i].$key, {
            status: this.status,
            stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
          })
        }
      }else{
        this.dataTutor.getHistory().update(this.getHistory[i].$key, {
          status: this.status,
          stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
        })
      }
    }
  }

  checkCurrentDateAndHistDate(date) {
    if (date == this.dataTutor.getCurrentDate()){
      return true;
    }else{
      return false;
    }
  }

  checkAlreadyOrNotStudy(rounds) {
    let roundTime = rounds;
    let currentTime: string;
    let hrCurrentTime: number;
    let mnCurrentTime: number;
    let hrRoundTime: number;
    let mnRoundTime: number;
    let statusBefore30min: boolean;
    currentTime = this.dataTutor.getCurrentTimeNoSec();
    hrCurrentTime = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
    mnCurrentTime = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
    hrRoundTime = parseInt(roundTime.substr(0, 2));
    mnRoundTime = parseInt(roundTime.substr(roundTime.indexOf('.') + 1, 2));
    let check: boolean;
    if (hrRoundTime - hrCurrentTime < 0) {
      check = true;
      this.status = this.ready;
    } else if (hrRoundTime - hrCurrentTime == 0 && mnRoundTime - mnCurrentTime < 0) {
      check = true;
      this.status = this.ready;
    } else {
      check = false;
      this.status = this.notStudy;
    }
    return check;
  }



  tutorial() {
    let modal = this.modalCtrl.create(HelpHistoryPage);
    modal.present();

  }

}
