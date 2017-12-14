import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LogonPage } from '../logon/logon';
import { RegisterPage } from '../register/register';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  open: string = '9.00';
  close: string = '21.00';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider,
    public alert: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  register() {
    if (this.checkTimeOpenAndClose()) {
      this.navCtrl.push(RegisterPage);
    } else {
      let alert = this.alert.create({
        title: 'ระบบเปิดเวลา 9.00 น.',
        subTitle: 'ขออภัยในความไม่สะดวก',
        buttons: ['ตกลง']
      });
      alert.present();
    }
    
  }

  logon() {
    // if (this.checkTimeOpenAndClose()) {
      this.navCtrl.push(LogonPage);
    // } else {
    //   let alert = this.alert.create({
    //     title: 'ระบบเปิดเวลา 9.00 น.',
    //     subTitle: 'ขออภัยในความไม่สะดวก',
    //     buttons: ['ตกลง']
    //   });
    //   alert.present();
    // }

  }

  checkTimeOpenAndClose() {
    let open: number;
    let close: number;
    let currentHr: number;
    let currentMin: number;
    open = parseInt(this.open.substr(0, 2));
    close = parseInt(this.close.substr(0, 2));
    currentHr = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
    currentMin = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
    if (currentHr >= open && currentHr <= close) {
      return true;
    } else {
      return false;
    }
  }


}
