import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the TimeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-time-modal',
  templateUrl: 'time-modal.html',

})
export class TimeModalPage {
  schedule: FirebaseListObservable<any[]>;
  rounds: any[] = []
  selectedRoundArr: any[] = []
  // selector:boolean;
  status: boolean;
  currentDate:any;

  constructor(public alert: AlertController, 
    public angularfire: AngularFireDatabase, 
    public viewCtrl: ViewController, 
    public modal: ModalController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {

    this.currentDate = dataTutor.getCurrentDate();

    this.schedule = this.dataTutor.getScheduleByBranchId(this.navParams.get('branchId'));
    this.schedule.forEach(item => {
      this.rounds = Object.keys(item).map(key => item[key]);
      let arrayTemp: any[] = []
      for (let i = 0; i < this.rounds.length; i++) {
        arrayTemp.push({
          time: this.rounds[i].time,
          seat: this.rounds[i].seat,
        })
      }
      this.rounds = arrayTemp;
      console.log('round:' + this.rounds.length)
    })
  }

  close() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeModalPage');
    this.viewCtrl.setBackButtonText('');
  }

  selectRound(round) {
    let disabled=false;
    if (round.seat <= 0) {
      disabled = true;
      let alert = this.alert.create({
        subTitle: 'ที่นั่งเต็ม',
        buttons: ['ตกลง']
      })
      alert.present();
      
    } else {
      if (this.selectedRoundArr.indexOf(round.time) !== -1) {
        this.selectedRoundArr.splice(this.selectedRoundArr.indexOf(round.time), 1)
      } else {
        this.selectedRoundArr.push(round.time);
      }
    }
    return disabled;
  }


  pushToSchedule() {
    this.viewCtrl.dismiss(this.selectedRoundArr);
    console.log(this.selectedRoundArr);
    console.dir(this.selectedRoundArr[0].$key);
    
  }


}
