import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HelpSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-schedule',
  templateUrl: 'help-schedule.html',
})
export class HelpSchedulePage {
  slides = [
    {
      image: "schedule1.png",
    },
    {
      image: "schedule2.png",
    },
    {
      image: "schedule3.png",
    },
    {
      image: "schedule4.png",
    },
    {
      image: "schedule5.png",
    }
  ]

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpSchedulePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
