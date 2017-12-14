import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ConfirmPage } from "../confirm/confirm";
import { ConfirmDetailPage } from "../confirm-detail/confirm-detail";
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { HetlpPaymentPage} from '../hetlp-payment/hetlp-payment';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  selectedTab = "wait";
  item: any;
  courseId: any;
  getWaitList: FirebaseListObservable<any[]>;
  getAlreadyList: FirebaseListObservable<any[]>;
  studentId: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angularFire: AngularFireDatabase,
    public dataTutor: DataTutorProvider,
    public modalCtrl: ModalController) {

    this.studentId = this.dataTutor.studentData.studentId;
    this.getWaitList = this.dataTutor.getPaymentByStuidstatus(this.studentId + '_' + 'wait');
    this.getAlreadyList = this.dataTutor.getPaymentByStuidstatus(this.studentId + '_' + 'already');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  goToConfirm(payment) {
    this.navCtrl.push(ConfirmPage, payment);
  }

  goToView(view) {
    this.navCtrl.push(ConfirmDetailPage, view);
  }

  remove(slidingItem: ItemSliding, key) {
    this.getWaitList.remove(key);
    slidingItem.close();
    //คืนชั่วโมงด้วย
  }

  tutorial() {
    let modal = this.modalCtrl.create(HetlpPaymentPage);
    modal.present();
  }

}
