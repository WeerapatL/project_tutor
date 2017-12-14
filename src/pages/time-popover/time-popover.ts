import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the TimePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-time-popover',
  templateUrl: 'time-popover.html',
})
export class TimePopoverPage {

  showRound:any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.showRound = navParams.data.round;
    console.log(this.showRound)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimePopoverPage');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
