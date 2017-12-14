import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashPage } from '../splash/splash';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  authForm: FormGroup;
  student: any = {
    // user_pass: '',
    studentId: '',
    username: '',
    password: '',
    fname: '',
    lname: '',
    email: '',
    tel: '',
    address: '',
    key: '',
    photo: 'assets/imgs/student.png'
  };
  errorRepassword: string = '';
  getStudent: any[];

  constructor(public alert: AlertController,
    public angularfire: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public ViewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {


    this.navCtrl = navCtrl;

    this.authForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(6), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      tel: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)])],
      address: ['', Validators.compose([Validators.required])],
      repassword: ['', Validators.compose([Validators.required])]
    });
    dataTutor.getStudents().subscribe(data => {
      this.getStudent = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.ViewCtrl.setBackButtonText('');
  }

  onSubmit(): void {
    if (this.checUsername()) {
      this.generateStuId();
      if (this.authForm.valid) {
        this.student.user_pass = this.student.username + '_' + this.student.password;
        this.dataTutor.getStudents().push(this.student);
        let alert = this.alert.create({
          title: 'สมัครเรียบร้อย',
          buttons: ['ตกลง']
        });
        alert.present();
        this.navCtrl.push(SplashPage);
      }
    } else {
      let alert = this.alert.create({
        title: 'ชื่อบัญชีมีผู้ใช้แล้ว',
        buttons: ['ตกลง']
      })
      alert.present();
    }

  }

  generateStuId() {
    console.log('length ' + this.getStudent.length)
    if (this.getStudent.length == 0) {
      this.student.studentId = 10001
    } else {
      this.student.studentId = +(this.getStudent[this.getStudent.length - 1].studentId)
      this.student.studentId = this.student.studentId + 1;
      console.log(this.student.studentId)
    }
  }

  checUsername() {
    let result: boolean
    for (let i = 0; i < this.getStudent.length; i++) {
      if (this.getStudent[i].username === this.student.username) {
        console.log('from firebase :'+this.getStudent[i].username)
        console.log('from input :'+this.student.username)
        result = false;
        break;
      } else {
        result = true;
      }
    }
    console.log(result)
    return result;
  }
}
