import { Component } from '@angular/core';
import { ViewController,NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ConfirmDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm-detail',
  templateUrl: 'confirm-detail.html',
})
export class ConfirmDetailPage {

  paymentDetail: any;

  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.paymentDetail = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmDetailPage');
    this.viewCtrl.setBackButtonText('');
  }

}
