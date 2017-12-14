import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HelpCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-course',
  templateUrl: 'help-course.html',
})
export class HelpCoursePage {
  slides = [
    {
      image: "subject1.png",
    }, 
    {
      image: "subject2.png",
    },
    {
      image: "subject3.png",
    },
  ]
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpCoursePage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
