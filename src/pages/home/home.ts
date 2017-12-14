import { Component } from '@angular/core';
import { AlertController, NavParams, NavController, App } from 'ionic-angular';
import { SplashPage } from '../../pages/splash/splash';
import { LogonPage } from "../logon/logon";
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  username: any[] = [];
  authForm: FormGroup;
  key = '';
  photo = '';
  base64Image: any;
  storageRef = firebase.storage().ref();
  options: any;
  student: any;
  studentName: FirebaseListObservable<any[]>;

  updateStudent: any = { fname: '', lname: '', email: '', tel: '', address: '' };
  // userUpdate: FirebaseListObservable<any[]>;

  constructor(private camera: Camera,
    public alert: AlertController,
    public angularFire: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public navCtrl: NavController,
    public actionSheet: ActionSheet,
    public dataTutor: DataTutorProvider,
    public app: App) {

    this.studentName = angularFire.list(this.dataTutor.studentsPath, {
      query: {
        orderByChild: this.dataTutor.studentChild,
        equalTo: this.dataTutor.studentData.studentId
      }
    })
    this.student = dataTutor.studentData;


    this.navCtrl = navCtrl;

    this.authForm = formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      tel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)])],
      address: ['', Validators.compose([Validators.required])],
    });
  }

  editPhoto() {
    let options: ActionSheetOptions = {
      buttonLabels: ['Take Photo', 'Choose Photo'],
      addCancelButtonWithLabel: 'Cancel',
      androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
    };
    this.actionSheet.show(options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
      this.takeSelfie(buttonIndex);
    })
  }

  takeSelfie(sourcePhoto: number): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourcePhoto,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      this.photo = 'data:image/png;base64,' + profilePicture;
      const selfieRef = firebase.storage().ref('/profilePictures/' + this.student.key);
      selfieRef
        .putString(profilePicture, 'base64', { contentType: 'image/png' })
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref('/Students/' + this.student.key + '/photo')
            .set(savedProfilePicture.downloadURL);
          console.log(profilePicture);
        }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
        });
    });
  }

  logout() {
    let alert = this.alert.create({
      title: 'คุณต้องการออกจากระบบ',
      buttons: [
        {
          text: 'แน่ใจ',
          handler: ()=>{
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('password');
            this.app.getRootNav().setRoot(SplashPage);
          }
        }, 
        {
          text: 'ยกเลิก',
          handler: ()=>{
            
          }
        }
      ]

    })

    alert.present();
    

  }

  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.dataTutor.getStudents().update(this.student.key,
        {
          fname: this.updateStudent.fname,
          lname: this.updateStudent.lname,
          email: this.updateStudent.email,
          tel: this.updateStudent.tel,
          address: this.updateStudent.address
        }
      ).then(() => {
        let alert = this.alert.create({
          title: 'อัปเดตข้อมูลเรียบร้อยแล้ว',
          buttons: ['ปิด']
        })
        alert.present();
      });
    }
  }

}
