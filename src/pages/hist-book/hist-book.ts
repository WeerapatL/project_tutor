import { Component } from '@angular/core';
import { PopoverController, NavController, NavParams, ViewController, ItemSliding } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { TimePopoverPage } from '../time-popover/time-popover';
/**
 * Generated class for the HistBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hist-book',
  templateUrl: 'hist-book.html',
})
export class HistBookPage {
  subjectName:any;
  getHistory:any;
  getCourse:any;
  getBranch:any;

  constructor(public viewCtrl: ViewController ,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataTutor: DataTutorProvider,
    public popover: PopoverController) {

    this.dataTutor.getHistory().subscribe(data => {
      this.getHistory = data;
    });

    dataTutor.getCourse().subscribe(data => {
      this.getCourse = data
    });

    dataTutor.getBranchs().subscribe(data => {
      this.getBranch = data
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistBookPage');
    this.viewCtrl.setBackButtonText('');
  }

  popoverTime(round) {
    let popover = this.popover.create(TimePopoverPage, { round });
    popover.present();
  }

  // showCourseName(courseId) {
  //   let courseName: any;
  //   for (let i = 0; i < this.getCourse.length; i++) {
  //     if (this.getCourse[i].$key == courseId) {
  //       courseName = this.getCourse[i].CourseName
  //     }
  //   }
  //   return courseName;
  // }

  showSubjectName(courseId) {
    let subjectName: any;
    for (let i = 0; i < this.getCourse.length; i++) {
      if (this.getCourse[i].$key == courseId) {
        subjectName = this.getCourse[i].subjName
      }
    }
    return subjectName;
  }

  // showBranchName(branchId) {
  //   let branchName: any;
  //   console.log(this.getBranch.length); 
  //   for (let i = 0; i < this.getBranch.length; i++) {
  //     if (this.getBranch[i].$key == branchId) {
  //       branchName = this.getBranch[i].branchName;
  //       break;
  //     }
  //   }
  //   return branchName;
  // }

}
