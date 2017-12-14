import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CancelBookPage } from '../cancel-book/cancel-book'; 
import { HistBookPage } from '../hist-book/hist-book'; 
import { SchedulePage } from '../schedule/schedule'; 
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }

  schedule(){
    this.navCtrl.push(SchedulePage);
  }

  cancel(){
    this.navCtrl.push(CancelBookPage);
  }

  history(){
    this.navCtrl.push(HistBookPage);
  }

  

}
