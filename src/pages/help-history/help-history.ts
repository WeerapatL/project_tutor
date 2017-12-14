import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HelpHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-history',
  templateUrl: 'help-history.html',
})
export class HelpHistoryPage {
  slides = [
    {
      image: "hist1.png",
    },
    {
      image: "hist2.png",
    },
    {
      image: "hist3.png",
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpHistoryPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
