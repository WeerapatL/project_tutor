import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the LogonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logon',
  templateUrl: 'logon.html',
})
export class LogonPage {

  authForm: FormGroup;
  username: string = '';
  password: string = '';

  items: Array<any> = [];
  keys: Array<any> = [];
  itemRef: firebase.database.Reference = firebase.database().ref(this.dataTutor.studentsPath);

  constructor(private alertCtrl: AlertController,
    public angularfire: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {

    this.navCtrl = navCtrl;

    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogonPage');
    this.viewCtrl.setBackButtonText('');

    this.itemRef.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach(itemSnap => {
        this.items.push(itemSnap.val());
        this.keys.push(itemSnap.key);
        return false;
      });
    });
  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      let list = this.items;
      let listkey = this.keys;
      let user = [];
      let i = 0;

      for (var j = 0; j < list.length; j++) {
        user[j] = list[j];
        user[j].key = listkey[j];
      }

      for (var x = 0; x < list.length; x++) {
        if (user[i].username == value.username && user[i].password == value.password) {
          this.navCtrl.push(TabsPage);
          this.dataTutor.studentData = user[i];
          break;
        } else {
          i++;
          if (i >= list.length) {
            let alert = this.alertCtrl.create({
              title: 'Username หรือ Password ผิดพลาด',
              subTitle: 'กรุณากรอกข้อมูลใหม่',
              buttons: ['ปิด']
            });
            alert.present();
          }
        }
      }
    }
  }

}



