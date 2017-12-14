import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ModalController } from 'ionic-angular';
import { CoursePage } from '../course/course';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { HelpCoursePage } from '../help-course/help-course';
/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subject',
  templateUrl: 'subject.html',
})
export class SubjectPage {
  getSubject: any[];

  constructor(public angularfire: AngularFireDatabase,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider,
    public modalCtrl: ModalController) {

    dataTutor.getSubjects().subscribe(data => {
      this.getSubject = data
    });

  }

  tutorial() {
    let modal = this.modalCtrl.create(HelpCoursePage);
    modal.present();
  }

  goToCourse(subj) {
    console.log(subj);
    this.navCtrl.push(CoursePage, subj);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectPage');
    this.viewCtrl.setBackButtonText('');
  }


}
