import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HetlpPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hetlp-payment',
  templateUrl: 'hetlp-payment.html',
})
export class HetlpPaymentPage {
  slides = [
    {
      image: "/assets/imgs/payment1.png",
    },
    {
      image: "/assets/imgs/payment2.png",
    },
    {
      image: "/assets/imgs/payment3.png",
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HetlpPaymentPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
