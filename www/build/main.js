webpackJsonp([0],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_splash_splash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    // userUpdate: FirebaseListObservable<any[]>;
    function HomePage(camera, alert, angularFire, formBuilder, navParams, navCtrl, actionSheet, dataTutor, app) {
        this.camera = camera;
        this.alert = alert;
        this.angularFire = angularFire;
        this.formBuilder = formBuilder;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.actionSheet = actionSheet;
        this.dataTutor = dataTutor;
        this.app = app;
        this.username = [];
        this.key = '';
        this.photo = '';
        this.storageRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage().ref();
        this.updateStudent = { fname: '', lname: '', email: '', tel: '', address: '' };
        this.studentName = angularFire.list(this.dataTutor.studentsPath, {
            query: {
                orderByChild: this.dataTutor.studentChild,
                equalTo: this.dataTutor.studentData.studentId
            }
        });
        this.student = dataTutor.studentData;
        this.navCtrl = navCtrl;
        this.authForm = formBuilder.group({
            firstname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*')])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*')])],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
            tel: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10)])],
            address: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
        });
    }
    HomePage.prototype.editPhoto = function () {
        var _this = this;
        var options = {
            buttonLabels: ['Take Photo', 'Choose Photo'],
            addCancelButtonWithLabel: 'Cancel',
            androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
        };
        this.actionSheet.show(options).then(function (buttonIndex) {
            console.log('Button pressed: ' + buttonIndex);
            _this.takeSelfie(buttonIndex);
        });
    };
    HomePage.prototype.takeSelfie = function (sourcePhoto) {
        var _this = this;
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourcePhoto,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (profilePicture) {
            // Send the picture to Firebase Storage
            _this.photo = 'data:image/png;base64,' + profilePicture;
            var selfieRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage().ref('/profilePictures/' + _this.student.key);
            selfieRef
                .putString(profilePicture, 'base64', { contentType: 'image/png' })
                .then(function (savedProfilePicture) {
                __WEBPACK_IMPORTED_MODULE_5_firebase___default.a
                    .database()
                    .ref('/Students/' + _this.student.key + '/photo')
                    .set(savedProfilePicture.downloadURL);
                console.log(profilePicture);
            }, function (error) {
                console.log("ERROR -> " + JSON.stringify(error));
            });
        });
    };
    HomePage.prototype.logout = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'คุณต้องการออกจากระบบ',
            buttons: [
                {
                    text: 'แน่ใจ',
                    handler: function () {
                        window.localStorage.removeItem('username');
                        window.localStorage.removeItem('password');
                        _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_splash_splash__["a" /* SplashPage */]);
                    }
                },
                {
                    text: 'ยกเลิก',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.onSubmit = function (value) {
        var _this = this;
        if (this.authForm.valid) {
            this.dataTutor.getStudents().update(this.student.key, {
                fname: this.updateStudent.fname,
                lname: this.updateStudent.lname,
                email: this.updateStudent.email,
                tel: this.updateStudent.tel,
                address: this.updateStudent.address
            }).then(function () {
                var alert = _this.alert.create({
                    title: 'อัปเดตข้อมูลเรียบร้อยแล้ว',
                    buttons: ['ปิด']
                });
                alert.present();
            });
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/home/home.html"*/'<ion-header>\n  <ion-toolbar hideBackButton >\n    <!-- <label class="save" (click)="save()">SAVE</label> -->\n<br>\n<div *ngFor="let student of studentName | async">\n    <div class="username" text-center>\n        ยินดีต้อนรับ &nbsp; {{student.fname}}\n    </div>\n\n    <ion-avatar text-center style="margin-top:20px;">\n      <img class="img-circle" src="{{student.photo}}" />\n    </ion-avatar>\n  </div>\n    <div text-center>\n      <button class="buttonchange" ion-button round small (click)="editPhoto()">\n        <div class="change">\n          เปลี่ยนรูปประจำตัว\n        </div>\n      </button>\n    </div>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content text-center>\n  <form [formGroup]="authForm" (ngSubmit)="onSubmit(authForm.value)">\n    <ion-list>\n      <ion-item [ngClass]="{\'error-border\':!authForm.controls.firstname.valid && authForm.controls.firstname.touched}">\n        <ion-label fixed class=\'fixedLabel\'>\n          ชื่อจริง\n        </ion-label>\n        <ion-input formControlName="firstname" type="text" value="{{student.fname}}" [(ngModel)]="updateStudent.fname"></ion-input>\n      </ion-item>\n      <p *ngIf="authForm.controls.firstname.hasError(\'required\') && authForm.controls.firstname.touched">จำเป็นต้องกรอกชื่อจริง!</p>\n      <p *ngIf="authForm.controls.firstname.hasError(\'pattern\') && authForm.controls.firstname.touched">เฉพาะตัวอักษรภาษาอังกฤษเท่านั้น!</p>\n\n\n      <ion-item [ngClass]="{\'error-border\':!authForm.controls.lastname.valid && authForm.controls.lastname.touched}">\n        <ion-label fixed class=\'fixedLabel\'>\n          นามสกุล\n        </ion-label>\n        <ion-input formControlName="lastname" type="text" value="{{student.lname}}" [(ngModel)]="updateStudent.lname"></ion-input>\n      </ion-item>\n      <p *ngIf="authForm.controls.lastname.hasError(\'required\') && authForm.controls.lastname.touched">จำเป็นต้องกรอกนามสกุล!</p>\n      <p *ngIf="authForm.controls.lastname.hasError(\'pattern\') && authForm.controls.lastname.touched">เฉพาะตัวอักษรภาษาอังกฤษเท่านั้น!</p>\n\n\n      <ion-item [ngClass]="{\'error-border\':!authForm.controls.email.valid && authForm.controls.email.touched}">\n        <ion-label fixed class=\'fixedLabel\'>\n          Email\n        </ion-label>\n        <ion-input formControlName="email" type="text" value="{{student.email}}" [(ngModel)]="updateStudent.email"></ion-input>\n      </ion-item>\n      <p *ngIf="authForm.controls.email.hasError(\'required\') && authForm.controls.email.touched">จำเป็นต้องกรอก Email!</p>\n      <p *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.email.touched">ตัวอย่าง: john@doe.com</p>\n\n\n      <ion-item [ngClass]="{\'error-border\':!authForm.controls.tel.valid && authForm.controls.tel.touched}">\n        <ion-label fixed class=\'fixedLabel\'>\n          โทร\n        </ion-label>\n        <ion-input formControlName="tel" type="text" value="{{student.tel}}" [(ngModel)]="updateStudent.tel"></ion-input>\n      </ion-item>\n      <p *ngIf="authForm.controls.tel.hasError(\'required\') && authForm.controls.tel.touched">จำเป็นต้องกรอกรหัสผ่าน!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'pattern\') && authForm.controls.tel.touched">เฉพาะตัวเลขเท่านั้น!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'minlength\') && authForm.controls.tel.touched">ตัวเลข 10 หลักเท่านั้น!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'maxlength\') && authForm.controls.tel.touched">ตัวเลข 10 หลักเท่านั้น!</p>\n\n\n      <ion-item [ngClass]="{\'error-border\':!authForm.controls.address.valid && authForm.controls.address.touched}">\n        <ion-label fixed class=\'fixedLabel\'>\n          ที่อยู่\n        </ion-label>\n        <ion-input formControlName="address" type="text" value="{{student.address}}" [(ngModel)]="updateStudent.address"></ion-input>\n      </ion-item>\n      <p *ngIf="authForm.controls.address.hasError(\'required\') && authForm.controls.address.touched">จำเป็นต้องกรอกที่อยู่!</p>\n    </ion-list>\n    <button ion-button round color="primary" [disabled]="!authForm.valid" type="submit" class="save" >บันทึก</button>\n  </form>\n  <br>\n  <button ion-button round color="danger" style="margin-top: 20px;width:140px;" (click)="logout()">ออกจากระบบ</button>\n\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_8__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimePopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the TimePopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TimePopoverPage = (function () {
    function TimePopoverPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.showRound = navParams.data.round;
        console.log(this.showRound);
    }
    TimePopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimePopoverPage');
    };
    TimePopoverPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    TimePopoverPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-time-popover',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/time-popover/time-popover.html"*/'<!--\n  Generated template for the TimePopoverPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n\n<ion-content text-center>\n  รอบที่จอง\n  <ion-item no-lines *ngFor="let round of showRound">\n    {{round}}\n  </ion-item>\n\n  \n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/time-popover/time-popover.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], TimePopoverPage);
    return TimePopoverPage;
}());

//# sourceMappingURL=time-popover.js.map

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataTutorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DataTutorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataTutorProvider = (function () {
    function DataTutorProvider(http, angularfire, storage) {
        this.http = http;
        this.angularfire = angularfire;
        this.storage = storage;
        this.branchsPath = '/Branchs/';
        this.courseStudentPath = '/CourseStudent/';
        this.coursePath = '/Courses/';
        this.paymentPath = '/Payment/';
        this.schedulePath = '/Schedule/';
        this.keySchedule = '-KzVFGmQ3JT9CXvYXXlz/';
        this.studentsPath = '/Students/';
        this.subjectsPath = '/Subjects/';
        this.chatsPath = '/chats/';
        this.historyPath = '/History/';
        this.studentChild = 'studentId';
        this.paymentChild = 'stuid_status';
        this.historyStudentStatus = 'stuid_status';
        this.courseChild = 'subjName';
    }
    DataTutorProvider.prototype.getBranchs = function () {
        this.branchs = this.angularfire.list(this.branchsPath);
        return this.branchs;
    };
    DataTutorProvider.prototype.getCourseStudent = function () {
        this.courseStudent = this.angularfire.list(this.courseStudentPath);
        return this.courseStudent;
    };
    DataTutorProvider.prototype.getCourse = function () {
        this.course = this.angularfire.list(this.coursePath);
        return this.course;
    };
    DataTutorProvider.prototype.getPayment = function () {
        this.payment = this.angularfire.list(this.paymentPath);
        return this.payment;
    };
    DataTutorProvider.prototype.getSchedule = function () {
        this.schedule = this.angularfire.list(this.schedulePath + this.keySchedule);
        return this.schedule;
    };
    DataTutorProvider.prototype.getStudents = function () {
        this.students = this.angularfire.list(this.studentsPath);
        return this.students;
    };
    DataTutorProvider.prototype.getSubjects = function () {
        this.subjects = this.angularfire.list(this.subjectsPath);
        return this.subjects;
    };
    DataTutorProvider.prototype.getChats = function () {
        this.chats = this.angularfire.list(this.chatsPath);
        return this.chats;
    };
    DataTutorProvider.prototype.getHistory = function () {
        this.history = this.angularfire.list(this.historyPath);
        return this.history;
    };
    //queryByChildPayment
    DataTutorProvider.prototype.getPaymentByStuidstatus = function (value) {
        this.payment = this.angularfire.list(this.paymentPath, {
            query: {
                orderByChild: this.paymentChild,
                equalTo: value
            }
        });
        return this.payment;
    };
    DataTutorProvider.prototype.getHistoryByStuidstatus = function (value) {
        this.history = this.angularfire.list(this.historyPath, {
            query: {
                orderByChild: this.historyStudentStatus,
                equalTo: value
            }
        });
        return this.history;
    };
    //getCourseStuByStuId
    DataTutorProvider.prototype.getCourseStuByStuId = function (value) {
        this.course = this.angularfire.list(this.courseStudentPath, {
            query: {
                orderByChild: this.studentChild,
                equalTo: value
            }
        });
        return this.course;
    };
    DataTutorProvider.prototype.getCourseStuByKey = function (value) {
        this.courseStudent = this.angularfire.list(this.courseStudentPath, {
            query: {
                orderByKey: true,
                equalTo: value
            }
        });
        return this.courseStudent;
    };
    DataTutorProvider.prototype.querySubjByKey = function (value) {
        this.subjects = this.angularfire.list(this.subjectsPath, {
            query: {
                orderByKey: true,
                equalTo: value
            }
        });
    };
    DataTutorProvider.prototype.getScheduleByBranchId = function (branchId) {
        this.schedule = this.angularfire.list(this.schedulePath + this.keySchedule + branchId);
        return this.schedule;
    };
    DataTutorProvider.prototype.queryCourseById = function (courseId) {
        this.course = this.angularfire.list(this.coursePath, {
            query: {
                orderByKey: true,
                equalTo: courseId
            }
        });
    };
    DataTutorProvider.prototype.getHistoryByStudentId = function (studentId) {
        this.history = this.angularfire.list(this.historyPath, {
            query: {
                orderByChild: this.studentChild,
                equalTo: studentId
            }
        });
        return this.history;
    };
    DataTutorProvider.prototype.getCurrentDate = function () {
        var currentDate = new Date().toLocaleDateString();
        return currentDate;
    };
    DataTutorProvider.prototype.getCurrentTime = function () {
        var hh = new Date().getHours();
        var mm = new Date().getMinutes();
        var ss = new Date().getSeconds();
        var currentTime = hh + '.' + mm + '.' + ss;
        return currentTime;
    };
    DataTutorProvider.prototype.getHistoryByHitoryId = function (historyId) {
        this.history = this.angularfire.list(this.historyPath, {
            query: {
                orderByKey: true,
                equalTo: historyId
            }
        });
        return this.history;
    };
    DataTutorProvider.prototype.getCourseBySubjName = function (subjName) {
        this.course = this.angularfire.list(this.coursePath, {
            query: {
                orderByChild: this.courseChild,
                equalTo: subjName
            }
        });
        return this.course;
    };
    DataTutorProvider.prototype.getCurrentTimeNoSec = function () {
        var hh = new Date().getHours();
        var mm = new Date().getMinutes();
        var currentTime = hh + '.' + mm;
        return currentTime;
    };
    DataTutorProvider.prototype.parseIntSubStrHourCurrentTimeforCheck = function () {
        return parseInt(this.getCurrentTimeNoSec().substr(0, 2));
    };
    DataTutorProvider.prototype.parseIntSubStrMinuteCurrentTimeforCheck = function () {
        return parseInt(this.getCurrentTimeNoSec().substr(this.getCurrentTimeNoSec().indexOf('.') + 1, this.getCurrentTimeNoSec().length - 1));
    };
    DataTutorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], DataTutorProvider);
    return DataTutorProvider;
}());

//# sourceMappingURL=data-tutor.js.map

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 126;

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogonPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the LogonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LogonPage = (function () {
    function LogonPage(alertCtrl, angularfire, formBuilder, viewCtrl, navCtrl, navParams, dataTutor) {
        this.alertCtrl = alertCtrl;
        this.angularfire = angularfire;
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.username = '';
        this.password = '';
        this.items = [];
        this.keys = [];
        this.itemRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref(this.dataTutor.studentsPath);
        this.navCtrl = navCtrl;
        this.authForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(20)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6)])]
        });
    }
    LogonPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad LogonPage');
        this.viewCtrl.setBackButtonText('');
        this.itemRef.on('value', function (itemSnapshot) {
            _this.items = [];
            itemSnapshot.forEach(function (itemSnap) {
                _this.items.push(itemSnap.val());
                _this.keys.push(itemSnap.key);
                return false;
            });
        });
    };
    LogonPage.prototype.onSubmit = function (value) {
        if (this.authForm.valid) {
            var list = this.items;
            var listkey = this.keys;
            var user = [];
            var i = 0;
            for (var j = 0; j < list.length; j++) {
                user[j] = list[j];
                user[j].key = listkey[j];
            }
            for (var x = 0; x < list.length; x++) {
                if (user[i].username == value.username && user[i].password == value.password) {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                    this.dataTutor.studentData = user[i];
                    break;
                }
                else {
                    i++;
                    if (i >= list.length) {
                        var alert_1 = this.alertCtrl.create({
                            title: 'Username หรือ Password ผิดพลาด',
                            subTitle: 'กรุณากรอกข้อมูลใหม่',
                            buttons: ['ปิด']
                        });
                        alert_1.present();
                    }
                }
            }
        }
    };
    LogonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logon',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/logon/logon.html"*/'<!--\n  Generated template for the LogonPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="school">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>เข้าสู่ระบบ</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content text-center padding>\n  <form [formGroup]="authForm" (ngSubmit)="onSubmit(authForm.value)">\n    <ion-item no-lines class="padding" full outline [ngClass]="{\'error-border\':!authForm.controls.username.valid && authForm.controls.username.touched}">\n      <ion-icon name="person" item-start></ion-icon>\n      <ion-input class="padding" formControlName="username" type="text" placeholder="     ชื่อผู้ใช้"></ion-input>\n    </ion-item>\n    <p *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">จำเป็นต้องกรอกชื่อผู้ใช้</p>\n    <p *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">เฉพาะตัวอักษร และ ตัวเลขเท่านั้น!</p>\n    <p *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">ชื่อผู้ใช้อย่างน้อย 6 ตัว!</p>\n    <p *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">ชื่อผู้ใช้อย่างน้อย 20 ตัว!</p>\n\n    <ion-item no-lines class="padding" full outline [ngClass]="{\'error-border\':!authForm.controls.password.valid && authForm.controls.password.touched}">\n      <ion-icon name="lock" item-start></ion-icon>\n      <ion-input class="padding" formControlName="password" type="password" placeholder="     รหัสผ่าน"></ion-input>\n    </ion-item>\n    <p *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">จำเป็นต้องกรอกรหัสผ่าน!</p>\n    <p *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">รหัสผ่านอย่างน้อย 6 ตัว!</p>\n\n    <button ion-button round class="login" [disabled]="!authForm.valid" type="submit">เข้าสู่ระบบ</button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/logon/logon.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], LogonPage);
    return LogonPage;
}());

//# sourceMappingURL=logon.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subject_subject__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__book_book__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_payment__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__question_question__ = __webpack_require__(240);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__subject_subject__["a" /* SubjectPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__book_book__["a" /* BookPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__payment_payment__["a" /* PaymentPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_5__question_question__["a" /* QuestionPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/tabs/tabs.html"*/'<ion-tabs color="school" id="tabs">\n  <ion-tab [root]="tab1Root" tabTitle="หน้าแรก" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="สมัครเรียน" tabIcon="create"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="จองเวลา" tabIcon="timer"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="ชำระเงิน" tabIcon="card"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="ถาม-ตอบ" tabIcon="chatbubbles"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__course_course__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_course_help_course__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SubjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SubjectPage = (function () {
    function SubjectPage(angularfire, viewCtrl, navCtrl, navParams, dataTutor, modalCtrl) {
        var _this = this;
        this.angularfire = angularfire;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.modalCtrl = modalCtrl;
        dataTutor.getSubjects().subscribe(function (data) {
            _this.getSubject = data;
        });
    }
    SubjectPage.prototype.tutorial = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__help_course_help_course__["a" /* HelpCoursePage */]);
        modal.present();
    };
    SubjectPage.prototype.goToCourse = function (subj) {
        console.log(subj);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__course_course__["a" /* CoursePage */], subj);
    };
    SubjectPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubjectPage');
        this.viewCtrl.setBackButtonText('');
    };
    SubjectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-subject',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/subject/subject.html"*/'<!--\n  Generated template for the SubjectPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>วิชา</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="tutorial()">\n        <ion-icon name="information-circle" ></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list text-center *ngFor="let subj of getSubject">\n    <button ion-button round (click)="goToCourse(subj)">\n      <img class="icon" src="assets/imgs/{{subj.subjName}}.png"/>\n      <div>{{subj.subjName}}</div>\n    </button>\n  </ion-list>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/subject/subject.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], SubjectPage);
    return SubjectPage;
}());

//# sourceMappingURL=subject.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoursePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_course_detail_course_detail__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CoursePage = (function () {
    function CoursePage(angularFire, viewCtrl, navCtrl, navParams, dataTutor) {
        // this.showCourses = angularFire.list('/Courses/',
        //   {
        //     query: {
        //       orderByChild: 'subjName',
        //       equalTo: navParams.get('subjName')
        //     }
        //   }
        // );
        // this.showCourses.subscribe(data => {
        //   let interval = setInterval(() => {
        //     if (this.getCourse.length == 0) {
        //       this.getCourse = data;
        //     } else {
        //       clearInterval(interval);
        //       console.dir(this.getCourse)
        //       this.content.resize();
        //     }
        var _this = this;
        this.angularFire = angularFire;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.quotesList = [];
        this.filterCourse = [];
        this.getCourse = [];
        //   })
        // });
        this.dataTutor.getCourseBySubjName(navParams.get('subjName')).subscribe(function (data) {
            _this.getCourse = data;
        });
    }
    CoursePage.prototype.searchCourse = function (event) {
        if (event.target.value) {
            if (event.target.value.length > 0) {
                var filterJson = this.getCourse.filter(function (row) {
                    if (row.CourseName.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                this.isFiltered = true;
                this.filterCourse = filterJson;
                if (this.filterCourse.length <= 0) {
                    this.shown = false;
                }
                else {
                    this.shown = true;
                }
            }
            else {
                this.isFiltered = false;
            }
        }
        else {
            this.isFiltered = false;
        }
    };
    CoursePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CoursePage');
        this.viewCtrl.setBackButtonText('');
    };
    CoursePage.prototype.courseDetail = function (course) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_course_detail_course_detail__["a" /* CourseDetailPage */], course);
        console.log(course);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CoursePage.prototype, "content", void 0);
    CoursePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-course',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/course/course.html"*/'<!--\n  Generated template for the CoursePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>หลักสูตร</ion-title>\n  </ion-navbar>\n  <ion-searchbar color="school" placeholder="ค้นหา" showCancelButton (ionInput)="searchCourse($event)"></ion-searchbar>\n</ion-header>\n\n\n<ion-content padding>\n<!-- <ion-list *ngIf="isFiltered"> -->\n\n  <span *ngIf="isFiltered">\n    <ion-list>\n      <ion-item no-lines *ngFor="let course of filterCourse" (click)="courseDetail(course)">\n        {{course.CourseName}}\n      </ion-item>\n    </ion-list>\n  </span>\n\n  <span *ngIf="!isFiltered">\n      <ion-list>\n        <ion-item no-lines *ngFor="let course of getCourse" (click)="courseDetail(course)">\n          {{course.CourseName}}\n        </ion-item>\n      </ion-list>\n    </span>\n  <!-- <span *ngIf="shown==false">\n    <ion-list>\n    <ion-item *ngFor="let course of getCourse" (click)="courseDetail(course)">\n      {{course.CourseName}}\n    </ion-item>\n  </ion-list>\n  </span> -->\n  <!-- </ion-list> -->\n\n\n\n\n\n\n  <!-- <ion-list no-lines>\n    <button ion-item full outline  *ngFor="let course of getCourse" (click)="courseDetail(course)">\n      {{course.CourseName}}\n    </button>\n  </ion-list> -->\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/course/course.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], CoursePage);
    return CoursePage;
}());

//# sourceMappingURL=course.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CourseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CourseDetailPage = (function () {
    function CourseDetailPage(alert, angularFire, viewCtrl, navCtrl, navParams, dataTutor) {
        this.alert = alert;
        this.angularFire = angularFire;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.payment = { stuid_status: '', price: '', CourseName: '', subjName: '', payTime: '', payDate: '', registDate: '', studentId: '', status: 'wait', courseId: '' };
        this.studentId = this.dataTutor.studentData.studentId;
        this.courseDetail = this.navParams.data;
        // this.getSubject = angularFire.list('/Subjects/', {
        //   query: {
        //     orderByKey: true,
        //     equalTo: this.courseDetail.subjId
        //   }
        // });
        console.log(this.courseDetail);
    }
    CourseDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CourseDetailPage');
        this.viewCtrl.setBackButtonText('');
    };
    CourseDetailPage.prototype.Confirm = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'ยืนยันการสมัคร',
            subTitle: 'คุณยืนยันที่จะสมัครเรียนใช่ไหม',
            buttons: [
                {
                    text: 'ยืนยัน',
                    role: 'confirm',
                    handler: function () {
                        _this.addPayment();
                        var alert = _this.alert.create({
                            title: 'ชำระเงิน',
                            subTitle: 'คุณต้องการที่จะชำระเงินตอนนี้หรือไม่',
                            buttons: [
                                {
                                    text: 'ไว้ภายหลัง',
                                    role: 'After',
                                    handler: function () {
                                        var alert = _this.alert.create({
                                            title: 'สมัครเรียบร้อย',
                                            subTitle: 'คุณสมัครเรียนเรียบร้อย สามารถชำระเงินภายหลังที่หน้าชำระเงินด้านล่าง',
                                            buttons: ['เรียบร้อย']
                                        });
                                        alert.present();
                                        _this.navCtrl.pop();
                                    }
                                },
                                {
                                    text: 'ชำระเงิน',
                                    role: 'Pay',
                                    handler: function () {
                                        _this.navCtrl.pop();
                                        _this.navCtrl.parent.select(3);
                                    }
                                }
                            ]
                        });
                        alert.present();
                    }
                },
                {
                    text: 'ยกเลิก',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    CourseDetailPage.prototype.addPayment = function () {
        this.payment.courseId = this.courseDetail.$key;
        this.payment.CourseName = this.courseDetail.CourseName;
        this.payment.price = this.courseDetail.price;
        this.payment.subjName = this.courseDetail.subjName;
        this.payment.registDate = this.getCurrentDate();
        //ก่อน add payment ต้องเก็บค่า stuId ก่อน
        this.payment.studentId = this.studentId;
        this.payment.stuid_status = this.payment.studentId + '_' + this.payment.status;
        this.dataTutor.getPayment().push(this.payment);
    };
    CourseDetailPage.prototype.getCurrentDate = function () {
        var currentDate = new Date().toLocaleDateString();
        return currentDate;
    };
    CourseDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-course-detail',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/course-detail/course-detail.html"*/'<!--\n  Generated template for the CourseDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>รายละเอียดหลักสูตร</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label>วิชา :</ion-label>\n    <ion-label class="right">{{courseDetail.subjName}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>รหัสคอร์ส :</ion-label>\n    <ion-label class="right">{{courseDetail.$key}}</ion-label>\n  </ion-item>\n  <ion-item no-lines> ชื่อคอร์ส :</ion-item>\n  <ion-item>\n    <ion-label class="right">{{courseDetail.CourseName}}</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>จำนวนชั่วโมง :</ion-label>\n    <ion-label class="right">{{courseDetail.hour}} &nbsp; ชั่วโมง</ion-label>\n  </ion-item>\n  <ion-item>\n    <ion-label>ราคาคอร์ส :</ion-label><ion-label class="right">{{courseDetail.price}}</ion-label>\n  </ion-item>\n  <br>\n  <ion-buttons text-center>\n      <button ion-button round (click)="Confirm()">\n        สมัครเรียน\n      </button>\n    </ion-buttons>\n\n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/course-detail/course-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], CourseDetailPage);
    return CourseDetailPage;
}());

//# sourceMappingURL=course-detail.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpCoursePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HelpCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpCoursePage = (function () {
    function HelpCoursePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                image: "subject1.png",
            },
            {
                image: "subject2.png",
            },
            {
                image: "subject3.png",
            },
        ];
    }
    HelpCoursePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpCoursePage');
    };
    HelpCoursePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HelpCoursePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help-course',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/help-course/help-course.html"*/'<!--\n  Generated template for the HelpCoursePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-slides pager>\n    <ion-slide *ngFor="let img of slides">\n      <ion-toolbar color="white">\n        <ion-buttons end>\n          <button ion-button color="primary" (click)="close()">ข้าม</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="img.image"/>\n    </ion-slide>\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/help-course/help-course.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]) === "function" && _c || Object])
    ], HelpCoursePage);
    return HelpCoursePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=help-course.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cancel_book_cancel_book__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hist_book_hist_book__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schedule_schedule__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookPage = (function () {
    function BookPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookPage');
    };
    BookPage.prototype.schedule = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__schedule_schedule__["a" /* SchedulePage */]);
    };
    BookPage.prototype.cancel = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cancel_book_cancel_book__["a" /* CancelBookPage */]);
    };
    BookPage.prototype.history = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__hist_book_hist_book__["a" /* HistBookPage */]);
    };
    BookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-book',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/book/book.html"*/'<!--\n  Generated template for the BookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="school">\n    <ion-title>จองเวลาเรียน</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content text-center padding>\n  <button ion-button round  (click)="schedule()">\n    <img class="img" src="assets/imgs/school.png" />\n    <div>จองเวลาเรียน</div>\n  </button>\n  <br>\n  <button ion-button round (click)="cancel()">\n    <img class="img" src="assets/imgs/history.png" />\n     ประวัติ\n  </button>\n  <br>\n  <!-- <button ion-button round  (click)="history()">\n    <img class="img" src="assets/imgs/history.png" />\n     ประวัติการจอง\n  </button> -->\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/book/book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], BookPage);
    return BookPage;
}());

//# sourceMappingURL=book.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CancelBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__time_popover_time_popover__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_history_help_history__ = __webpack_require__(231);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the CancelBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CancelBookPage = (function () {
    function CancelBookPage(dataTutor, angularFire, ViewCtrl, navCtrl, navParams, popover, alert, modalCtrl) {
        var _this = this;
        this.dataTutor = dataTutor;
        this.angularFire = angularFire;
        this.ViewCtrl = ViewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popover = popover;
        this.alert = alert;
        this.modalCtrl = modalCtrl;
        this.selectedTab = "wait";
        this.ready = 'Already';
        this.notStudy = 'Not Study';
        dataTutor.getHistoryByStudentId(dataTutor.studentData.studentId).subscribe(function (data) {
            _this.getHistory = data;
        });
        dataTutor.getCourse().subscribe(function (data) {
            _this.getCourse = data;
        });
        //ของปอม
        dataTutor.getSchedule().subscribe(function (data) {
            _this.getBranch = data;
        });
        dataTutor.getBranchs().subscribe(function (data) {
            _this.getBranchStudy = data;
        });
        this.getWait = this.dataTutor.getHistoryByStuidstatus(dataTutor.studentData.studentId + '_' + this.notStudy);
        this.getAlready = this.dataTutor.getHistoryByStuidstatus(dataTutor.studentData.studentId + '_' + this.ready);
    }
    CancelBookPage.prototype.ionViewDidLoad = function () {
        console.log('Cancel Book Page');
        this.ViewCtrl.setBackButtonText('');
    };
    CancelBookPage.prototype.showCourseName = function (courseId) {
        var courseName;
        for (var i = 0; i < this.getCourse.length; i++) {
            if (this.getCourse[i].$key == courseId) {
                courseName = this.getCourse[i].CourseName;
            }
        }
        return courseName;
    };
    CancelBookPage.prototype.showSubjectName = function (courseId) {
        var subjectName;
        for (var i = 0; i < this.getCourse.length; i++) {
            if (this.getCourse[i].$key == courseId) {
                subjectName = this.getCourse[i].subjName;
            }
        }
        return subjectName;
    };
    CancelBookPage.prototype.showBranchName = function (branchId) {
        var branchName;
        for (var i = 0; i < this.getBranchStudy.length; i++) {
            if (this.getBranchStudy[i].$key == branchId) {
                branchName = this.getBranchStudy[i].branchName;
            }
        }
        return branchName;
    };
    CancelBookPage.prototype.popoverTime = function (myEvent, slidingItem, round) {
        var popover = this.popover.create(__WEBPACK_IMPORTED_MODULE_4__time_popover_time_popover__["a" /* TimePopoverPage */], { round: round });
        popover.onDidDismiss(function (data) {
            slidingItem.close();
        });
        popover.present({
            ev: myEvent
        });
    };
    CancelBookPage.prototype.cancel = function (slidingItem, hist) {
        var _this = this;
        var keyCourse = hist.keyCourse;
        var returnHr = hist.bookHr;
        var keyHist = hist.$key;
        var round = hist.round;
        var branchId = hist.branchId;
        if (!this.checkStatusCancelBefore30min(round)) {
            var alert_1 = this.alert.create({
                subTitle: 'กรุณายกเลิกก่อนเวลาเรียน 30 นาทีค่ะ',
                buttons: [{
                        text: 'ตกลง',
                        role: 'ok',
                        handler: function () {
                            slidingItem.close();
                        }
                    }]
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alert.create({
                title: 'ยกเลิกการจอง',
                subTitle: 'คุณต้องการยกเลิกการจองนี้ใช่ไหม',
                buttons: [{
                        text: 'แน่ใจ',
                        role: 'confirm',
                        handler: function () {
                            _this.returnSeat(round, branchId);
                            _this.returnHr(keyCourse, returnHr);
                            _this.dataTutor.getHistory().remove(keyHist);
                            slidingItem.close();
                        }
                    }, {
                        text: 'ยกเลิก',
                        role: 'cancel'
                    }]
            });
            alert_2.present();
        }
    };
    CancelBookPage.prototype.returnHr = function (key, returnHr) {
        var _this = this;
        var updateHr = 0;
        this.dataTutor.getCourseStuByKey(key).subscribe(function (data) {
            _this.getCourseStu = data;
            updateHr = _this.getCourseStu[0].amountHr + returnHr;
        });
        var interval = setInterval(function () {
            if (updateHr != 0) {
                clearInterval(interval);
                _this.dataTutor.getCourseStudent().update(key, {
                    amountHr: updateHr
                });
            }
        });
    };
    CancelBookPage.prototype.returnSeat = function (roundHist, branchId) {
        for (var j = 0; j < this.getBranch.length; j++) {
            if (this.getBranch[j].$key == branchId) {
                var getRound = this.getBranch[j];
                for (var k = 0; k < getRound.length; k++) {
                    for (var i = 0; i < roundHist.length; i++) {
                        if (getRound[k].time == roundHist[i]) {
                            console.log('key is ' + getRound[k]);
                            this.dataTutor.getSchedule().update(branchId + '/' + [k], { seat: getRound[k].seat + 1 });
                        }
                    }
                }
            }
        }
    };
    CancelBookPage.prototype.checkStatusCancelBefore30min = function (round) {
        var currentTime;
        var hrCurrentTime;
        var mnCurrentTime;
        var hrRoundTime;
        var mnRoundTime;
        var statusBefore30min;
        currentTime = this.dataTutor.getCurrentTimeNoSec();
        hrCurrentTime = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
        mnCurrentTime = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
        var roundTime;
        for (var i = 0; i < round.length; i++) {
            roundTime = round[0];
            break;
        }
        hrRoundTime = parseInt(roundTime.substr(0, 2));
        mnRoundTime = parseInt(roundTime.substr(roundTime.indexOf('.') + 1, 2));
        if (hrRoundTime - hrCurrentTime > 1) {
            statusBefore30min = true;
        }
        else if (hrRoundTime - hrCurrentTime == 0 && mnRoundTime - mnCurrentTime >= 30) {
            statusBefore30min = true;
        }
        else if (hrRoundTime - hrCurrentTime == 1 && mnRoundTime - mnCurrentTime >= -30) {
            statusBefore30min = true;
        }
        else {
            statusBefore30min = false;
        }
        return statusBefore30min;
    };
    CancelBookPage.prototype.updateStatusToFirebase = function () {
        var historytList = this.getHistory;
        var rounds = [];
        var date = [];
        for (var i = 0; i < historytList.length; i++) {
            rounds[i] = historytList[i].round[0];
            date[i] = historytList[i].date;
            if (this.checkCurrentDateAndHistDate(date[i])) {
                if (this.checkAlreadyOrNotStudy(rounds[i])) {
                    this.dataTutor.getHistory().update(this.getHistory[i].$key, {
                        status: this.status,
                        stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
                    });
                }
                else {
                    this.dataTutor.getHistory().update(this.getHistory[i].$key, {
                        status: this.status,
                        stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
                    });
                }
            }
            else {
                this.dataTutor.getHistory().update(this.getHistory[i].$key, {
                    status: this.status,
                    stuid_status: this.dataTutor.studentData.studentId + '_' + this.status
                });
            }
        }
    };
    CancelBookPage.prototype.checkCurrentDateAndHistDate = function (date) {
        if (date == this.dataTutor.getCurrentDate()) {
            return true;
        }
        else {
            return false;
        }
    };
    CancelBookPage.prototype.checkAlreadyOrNotStudy = function (rounds) {
        var roundTime = rounds;
        var currentTime;
        var hrCurrentTime;
        var mnCurrentTime;
        var hrRoundTime;
        var mnRoundTime;
        var statusBefore30min;
        currentTime = this.dataTutor.getCurrentTimeNoSec();
        hrCurrentTime = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
        mnCurrentTime = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
        hrRoundTime = parseInt(roundTime.substr(0, 2));
        mnRoundTime = parseInt(roundTime.substr(roundTime.indexOf('.') + 1, 2));
        var check;
        if (hrRoundTime - hrCurrentTime < 0) {
            check = true;
            this.status = this.ready;
        }
        else if (hrRoundTime - hrCurrentTime == 0 && mnRoundTime - mnCurrentTime < 0) {
            check = true;
            this.status = this.ready;
        }
        else {
            check = false;
            this.status = this.notStudy;
        }
        return check;
    };
    CancelBookPage.prototype.tutorial = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__help_history_help_history__["a" /* HelpHistoryPage */]);
        modal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], CancelBookPage.prototype, "content", void 0);
    CancelBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cancel-book',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/cancel-book/cancel-book.html"*/'<!--\n  Generated template for the CancelBookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar color="school">\n		<ion-title>ยกเลิกการจอง</ion-title>\n		<ion-buttons end>\n			<button ion-button icon-only (click)="tutorial()">\n				<ion-icon name="information-circle"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content padding text-center>\n	<ion-segment [(ngModel)]="selectedTab" color="school">\n		<ion-segment-button value="wait">\n			<div class="text" (click)="updateStatusToFirebase()">ยังไม่ได้เริ่มเรียน</div>\n		</ion-segment-button>\n		<ion-segment-button value="already">\n			<div class="text" (click)="updateStatusToFirebase()">เริ่มเรียนไปแล้ว</div>\n		</ion-segment-button>\n	</ion-segment>\n\n	<span *ngIf="selectedTab==\'wait\'">\n	<ion-list>\n		<ion-item-sliding #slidingItem *ngFor="let hist of getWait | async">\n			<ion-item>\n				คอร์ส: {{showCourseName(hist.courseId)}}<br>\n				วิชา: {{showSubjectName(hist.courseId)}}<br>\n				สาขา: {{showBranchName(hist.branchId)}}\n			</ion-item>\n			<ion-item-options side="left">\n				<button ion-button icon-only (click)="cancel(slidingItem,hist)" color="white">\n					<ion-icon color="danger" name="remove-circle"></ion-icon>\n				</button>\n			</ion-item-options>\n			<ion-item-options side="right">\n				<button ion-button icon-only (click)="popoverTime($event,slidingItem,hist.round)" color="school">\n					<ion-icon name="list-box"></ion-icon>\n				</button>\n			</ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n</span>\n\n\n<span *ngIf="selectedTab==\'already\'">\n	<ion-list>\n		<ion-item-sliding #slidingItem *ngFor="let hist of getAlready | async">\n			<ion-item>\n				คอร์ส: {{showCourseName(hist.courseId)}}<br>\n				วิชา: {{showSubjectName(hist.courseId)}}<br>\n				สาขา: {{showBranchName(hist.branchId)}}\n			</ion-item>\n			<ion-item-options side="right">\n				<button ion-button icon-only (click)="popoverTime($event,slidingItem,hist.round)" color="school">\n					<ion-icon name="list-box"></ion-icon>\n				</button>\n			</ion-item-options>\n		</ion-item-sliding>\n	</ion-list>\n</span> \n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/cancel-book/cancel-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], CancelBookPage);
    return CancelBookPage;
}());

//# sourceMappingURL=cancel-book.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HelpHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpHistoryPage = (function () {
    function HelpHistoryPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                image: "hist1.png",
            },
            {
                image: "hist2.png",
            },
            {
                image: "hist3.png",
            }
        ];
    }
    HelpHistoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpHistoryPage');
    };
    HelpHistoryPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HelpHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help-history',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/help-history/help-history.html"*/'<!--\n  Generated template for the HelpHistoryPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-slides pager>\n    <ion-slide *ngFor="let img of slides">\n      <ion-toolbar color="white">\n        <ion-buttons end>\n          <button ion-button color="primary" (click)="close()">ข้าม</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="img.image" />\n    </ion-slide>\n  </ion-slides>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/help-history/help-history.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], HelpHistoryPage);
    return HelpHistoryPage;
}());

//# sourceMappingURL=help-history.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistBookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__time_popover_time_popover__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HistBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistBookPage = (function () {
    function HistBookPage(viewCtrl, navCtrl, navParams, dataTutor, popover) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.popover = popover;
        this.dataTutor.getHistory().subscribe(function (data) {
            _this.getHistory = data;
        });
        dataTutor.getCourse().subscribe(function (data) {
            _this.getCourse = data;
        });
        dataTutor.getBranchs().subscribe(function (data) {
            _this.getBranch = data;
        });
    }
    HistBookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HistBookPage');
        this.viewCtrl.setBackButtonText('');
    };
    HistBookPage.prototype.popoverTime = function (round) {
        var popover = this.popover.create(__WEBPACK_IMPORTED_MODULE_3__time_popover_time_popover__["a" /* TimePopoverPage */], { round: round });
        popover.present();
    };
    // showCourseName(courseId) {
    //   let courseName: any;
    //   for (let i = 0; i < this.getCourse.length; i++) {
    //     if (this.getCourse[i].$key == courseId) {
    //       courseName = this.getCourse[i].CourseName
    //     }
    //   }
    //   return courseName;
    // }
    HistBookPage.prototype.showSubjectName = function (courseId) {
        var subjectName;
        for (var i = 0; i < this.getCourse.length; i++) {
            if (this.getCourse[i].$key == courseId) {
                subjectName = this.getCourse[i].subjName;
            }
        }
        return subjectName;
    };
    HistBookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-hist-book',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/hist-book/hist-book.html"*/'<!--\n  Generated template for the HistBookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>ประวัติ</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let history of getHistory">\n      {{showSubjectName(history.courseId)}}\n      <!-- {{history.time}} -->\n      <ion-icon (click)="popoverTime(history.round)" name="list-box"></ion-icon>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/hist-book/hist-book.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */]])
    ], HistBookPage);
    return HistBookPage;
}());

//# sourceMappingURL=hist-book.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__time_modal_time_modal__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__help_schedule_help_schedule__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SchedulePage = (function () {
    function SchedulePage(dataTutor, alert, modal, angularfire, tutor, actionSheetCtrl, modalCtrl, alertCtrl, popoverCtrl, ViewCtrl, navCtrl, navParams) {
        var _this = this;
        this.dataTutor = dataTutor;
        this.alert = alert;
        this.modal = modal;
        this.angularfire = angularfire;
        this.tutor = tutor;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.ViewCtrl = ViewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getSelectedRound = [];
        this.bookHr = 0;
        this.amountTime = '';
        this.dataTutor.getBranchs().subscribe(function (data) {
            _this.getBranchs = data;
        });
        this.dataTutor.getSchedule().subscribe(function (data) {
            _this.getSchedule = data;
        });
        this.dataTutor.getCourseStuByStuId(this.dataTutor.studentData.studentId)
            .subscribe(function (data) {
            _this.getCourseStu = data;
        });
        this.timer = this.dataTutor.getCourseStudent();
    }
    SchedulePage.prototype.showTime = function () {
        for (var i = 0; i < this.getCourseStu.length; i++) {
            if (this.getCourseStu[i].$key == this.selectCourse) {
                console.log('if');
                console.dir(this.getCourseStu[i]);
                this.amountTime = this.getCourseStu[i].amountHr;
                this.content.resize();
                break;
            }
        }
    };
    SchedulePage.prototype.selectRound = function (branchId) {
        var _this = this;
        if (branchId == undefined) {
            var alert_1 = this.alert.create({
                title: 'กรุณาเลือกสาขาที่ต้องการจอง',
                buttons: ['ตกลง']
            });
            alert_1.present();
        }
        else {
            var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__time_modal_time_modal__["a" /* TimeModalPage */], { branchId: branchId });
            modal.onDidDismiss(function (data) {
                _this.getSelectedRound = data;
                if (_this.getSelectedRound != null) {
                    _this.getSelectedRound.sort();
                }
                console.log(_this.getSelectedRound);
            });
            modal.present();
        }
    };
    SchedulePage.prototype.showSelectedHr = function () {
        if (this.getSelectedRound)
            this.bookHr = this.getSelectedRound.length / 2;
        return this.bookHr;
    };
    SchedulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SchedulePage');
        this.ViewCtrl.setBackButtonText('');
    };
    SchedulePage.prototype.confirm = function () {
        var _this = this;
        var alert = this.alert.create({
            subTitle: 'คุณยืนยันที่จะจองใช่ไหม',
            buttons: [{
                    text: 'แน่ใจ',
                    role: 'confirm',
                    handler: function () {
                        _this.addHistory();
                        _this.updateHr();
                        _this.updateSeat();
                    }
                },
                {
                    text: 'ยกเลิก',
                    role: 'Cancel'
                }]
        });
        alert.present();
    };
    SchedulePage.prototype.updateSeat = function () {
        var updateSeat = [];
        for (var i = 0; i < this.getSchedule.length - 1; i++) {
            if (this.getSchedule[i].$key == this.branchId) {
                var Branch = this.getSchedule[i];
                console.log(Branch);
                for (var j = 0; j < Branch.length; j++) {
                    for (var k = 0; k < this.getSelectedRound.length; k++) {
                        if (Branch[j].time == this.getSelectedRound[k]) {
                            Branch[j].seat = ((+Branch[j].seat) - 1);
                        }
                    }
                }
                this.dataTutor.getSchedule().update(Branch.$key, Branch);
                console.dir('updateSeat : ' + Branch.$key);
            }
        }
    };
    SchedulePage.prototype.updateHr = function () {
        var _this = this;
        var bookHr = this.getSelectedRound.length / 2;
        if (this.getSelectedRound.length > 0) {
            __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref(this.dataTutor.courseStudentPath + this.selectCourse)
                .once('value')
                .then(function (data) {
                var courseStu = data.val();
                if (courseStu.amountHr - bookHr < 0) {
                    var alert_2 = _this.alert.create({
                        title: 'ชั่วโมงคงเหลือไม่เพียงพอ',
                        buttons: ['ตกลง']
                    });
                    alert_2.present();
                }
                else {
                    _this.dataTutor.getCourseStudent().update(_this.selectCourse, {
                        amountHr: courseStu.amountHr - bookHr
                    });
                }
            });
        }
        else {
        }
    };
    SchedulePage.prototype.addHistory = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref(this.dataTutor.courseStudentPath + this.selectCourse)
            .once('value')
            .then(function (data) {
            var courseStu = data.val();
            var status = 'Not Study';
            var stuid_status = '';
            var studentId = _this.dataTutor.studentData.studentId;
            _this.dataTutor.getHistory().push({
                studentId: studentId,
                round: _this.getSelectedRound,
                bookHr: _this.getSelectedRound.length / 2,
                courseId: courseStu.courseId,
                date: _this.dataTutor.getCurrentDate(),
                time: _this.dataTutor.getCurrentTime(),
                keyCourse: _this.selectCourse,
                branchId: _this.branchId,
                status: status,
                stuid_status: studentId + '_' + status
            });
            _this.navCtrl.pop();
        }).catch(function (er) {
            var alert = _this.alert.create({
                subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                buttons: ['ตกลง']
            });
            alert.present();
        });
    };
    SchedulePage.prototype.tutorial = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__help_schedule_help_schedule__["a" /* HelpSchedulePage */]);
        modal.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], SchedulePage.prototype, "content", void 0);
    SchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-schedule',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/schedule/schedule.html"*/'<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>จองเวลาเรียน</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="tutorial()">\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n\n</ion-header>\n\n<ion-content padding>\n  \n\n  <ion-list-header no-lines>\n    เลือกสาขา\n  </ion-list-header>\n  <ion-item>\n    <ion-label>\n    </ion-label>\n    <ion-select [(ngModel)]="branchId" multiple="false">\n      <ion-option *ngFor="let branch of getBranchs" value="{{branch.$key}}">\n        {{branch.branchName}}\n      </ion-option>\n    </ion-select>\n  </ion-item>\n\n  <ion-list-header no-lines>\n    เลือกคอร์ส\n  </ion-list-header>\n  <ion-item>\n    <ion-label>\n    </ion-label>\n    <ion-select [(ngModel)]="selectCourse" (ionChange)="showTime($event)" multiple="false" >\n      <ion-option *ngFor="let course of getCourseStu" value="{{course.$key}}">\n        {{course.courseId}}&nbsp;&nbsp;{{course.CourseName}}\n      </ion-option>\n    </ion-select>\n  </ion-item>\n\n\n  <ion-list-header no-lines>\n    เลือกเวลาเรียน\n  </ion-list-header>\n  <ion-item text-center (click)="selectRound(branchId)">\n    <ion-buttons>\n      <button class="button" ion-button round color="secondary">เลือกเวลา</button>\n    </ion-buttons>\n    <ion-item text-center no-lines *ngFor="let time of getSelectedRound">\n      {{time}}\n    </ion-item>\n  </ion-item>\n \n\n  <ion-card>\n    <br>\n    <ion-title>จอง&nbsp;&nbsp;{{showSelectedHr()}}&nbsp;ชั่วโมง</ion-title>\n    <br>\n    <ion-title>เหลือ&nbsp;&nbsp;{{amountTime}}&nbsp;ชั่วโมง</ion-title>\n    <br>\n  </ion-card>\n  <ion-buttons  text-center>\n    <button class="book" ion-button round (click)="confirm()">\n      จอง\n    </button>\n  </ion-buttons>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/schedule/schedule.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], SchedulePage);
    return SchedulePage;
}());

//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimeModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TimeModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TimeModalPage = (function () {
    function TimeModalPage(alert, angularfire, viewCtrl, modal, navCtrl, navParams, dataTutor) {
        var _this = this;
        this.alert = alert;
        this.angularfire = angularfire;
        this.viewCtrl = viewCtrl;
        this.modal = modal;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.rounds = [];
        this.selectedRoundArr = [];
        this.currentDate = dataTutor.getCurrentDate();
        this.schedule = this.dataTutor.getScheduleByBranchId(this.navParams.get('branchId'));
        this.schedule.forEach(function (item) {
            _this.rounds = Object.keys(item).map(function (key) { return item[key]; });
            var arrayTemp = [];
            for (var i = 0; i < _this.rounds.length; i++) {
                arrayTemp.push({
                    time: _this.rounds[i].time,
                    seat: _this.rounds[i].seat,
                });
            }
            _this.rounds = arrayTemp;
            console.log('round:' + _this.rounds.length);
        });
    }
    TimeModalPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    TimeModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TimeModalPage');
        this.viewCtrl.setBackButtonText('');
    };
    TimeModalPage.prototype.selectRound = function (round) {
        var disabled = false;
        if (round.seat <= 0) {
            disabled = true;
            var alert_1 = this.alert.create({
                subTitle: 'ที่นั่งเต็ม',
                buttons: ['ตกลง']
            });
            alert_1.present();
        }
        else {
            if (this.selectedRoundArr.indexOf(round.time) !== -1) {
                this.selectedRoundArr.splice(this.selectedRoundArr.indexOf(round.time), 1);
            }
            else {
                this.selectedRoundArr.push(round.time);
            }
        }
        return disabled;
    };
    TimeModalPage.prototype.pushToSchedule = function () {
        this.viewCtrl.dismiss(this.selectedRoundArr);
        console.log(this.selectedRoundArr);
        console.dir(this.selectedRoundArr[0].$key);
    };
    TimeModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-time-modal',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/time-modal/time-modal.html"*/'<!--\n  Generated template for the TimeModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header color="school">\n  <ion-icon class="close" name="close" (click)="close()"></ion-icon>\n  <ion-title>รอบเวลาวันที่ &nbsp;{{currentDate}}</ion-title>\n</ion-header>\n\n<ion-content padding text-center>\n  <ion-list no-lines>\n    <ion-list no-lines *ngFor="let round of rounds">\n      <ion-item>\n        <ion-label>\n          {{round.time}}\n        </ion-label>\n        <ion-label>\n          Seat:&nbsp;{{round.seat}}\n        </ion-label>\n        <ion-checkbox color="dark" status="false" [(ngModel)]="round.status" (click)="selectRound(round)"></ion-checkbox>\n      </ion-item>\n    </ion-list>\n\n    <br>\n    <button ion-button class="button" round (click)="pushToSchedule()">\n      เลือกเวลาเรียน\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/time-modal/time-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], TimeModalPage);
    return TimeModalPage;
}());

//# sourceMappingURL=time-modal.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpSchedulePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HelpSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpSchedulePage = (function () {
    function HelpSchedulePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                image: "schedule1.png",
            },
            {
                image: "schedule2.png",
            },
            {
                image: "schedule3.png",
            },
            {
                image: "schedule4.png",
            },
            {
                image: "schedule5.png",
            }
        ];
    }
    HelpSchedulePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpSchedulePage');
    };
    HelpSchedulePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HelpSchedulePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help-schedule',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/help-schedule/help-schedule.html"*/'<!--\n  Generated template for the HelpSchedulePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-slides pager>\n    <ion-slide *ngFor="let img of slides">\n      <ion-toolbar color="white">\n        <ion-buttons end>\n          <button ion-button color="primary" (click)="close()">ข้าม</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="img.image" />\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/help-schedule/help-schedule.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]) === "function" && _c || Object])
    ], HelpSchedulePage);
    return HelpSchedulePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=help-schedule.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__confirm_confirm__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__confirm_detail_confirm_detail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hetlp_payment_hetlp_payment__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaymentPage = (function () {
    function PaymentPage(navCtrl, navParams, angularFire, dataTutor, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularFire = angularFire;
        this.dataTutor = dataTutor;
        this.modalCtrl = modalCtrl;
        this.selectedTab = "wait";
        this.studentId = this.dataTutor.studentData.studentId;
        this.getWaitList = this.dataTutor.getPaymentByStuidstatus(this.studentId + '_' + 'wait');
        this.getAlreadyList = this.dataTutor.getPaymentByStuidstatus(this.studentId + '_' + 'already');
    }
    PaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaymentPage');
    };
    PaymentPage.prototype.goToConfirm = function (payment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__confirm_confirm__["a" /* ConfirmPage */], payment);
    };
    PaymentPage.prototype.goToView = function (view) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__confirm_detail_confirm_detail__["a" /* ConfirmDetailPage */], view);
    };
    PaymentPage.prototype.remove = function (slidingItem, key) {
        this.getWaitList.remove(key);
        slidingItem.close();
        //คืนชั่วโมงด้วย
    };
    PaymentPage.prototype.tutorial = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__hetlp_payment_hetlp_payment__["a" /* HetlpPaymentPage */]);
        modal.present();
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/payment/payment.html"*/'<!--\n  Generated template for the PaymentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>ชำระเงิน</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="tutorial()">\n        <ion-icon name="information-circle"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content text-center class="ion-content" padding>\n\n  <ion-segment [(ngModel)]="selectedTab" color="school">\n    <ion-segment-button value="wait">\n      <div class="text">ยังไม่ชำระ</div>\n    </ion-segment-button>\n    <ion-segment-button value="already">\n      <div class="text">ชำระแล้ว</div>\n    </ion-segment-button>\n  </ion-segment>\n\n  <span *ngIf="selectedTab==\'wait\'">\n\n    <ion-list>\n      <ion-item-sliding #slidingItem *ngFor="let payment of getWaitList | async" (click)="goToConfirm(payment)">\n        <ion-item>\n          คอร์ส :&nbsp;&nbsp; {{payment.courseId}}&nbsp; {{payment.CourseName}}\n          <br> วิชา {{payment.subjName}} &nbsp;|&nbsp; ราคา&nbsp;{{payment.price}}\n        </ion-item>\n        <ion-item-options side="left">\n          <button ion-button icon-only (click)="remove(slidingItem,payment.$key)" color="white">\n            <ion-icon name="remove-circle" color="danger"></ion-icon>\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </span>\n\n  <span *ngIf="selectedTab==\'already\'">\n    <ion-list>\n      <ion-item *ngFor="let view of getAlreadyList | async" (click)="goToView(view)">\n         คอร์ส :&nbsp;&nbsp; {{view.courseId}} &nbsp;{{view.CourseName}}\n        <br> วิชา {{view.subjName}} &nbsp;|&nbsp; ราคา&nbsp;{{view.price}}\n      </ion-item>\n    </ion-list>\n\n\n  </span>\n\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/payment/payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import {} from
/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfirmPage = (function () {
    function ConfirmPage(alert, angularFire, viewCtrl, navCtrl, navParams, dataTutor) {
        this.alert = alert;
        this.angularFire = angularFire;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.courseStudent = { studentId: '', CourseName: '', courseId: '', registDate: '', subjName: '', amountHr: '' };
        this.paymentDetail = this.navParams.data;
        this.studentId = this.dataTutor.studentData.studentId;
    }
    ConfirmPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormPage');
        this.viewCtrl.setBackButtonText('');
    };
    ConfirmPage.prototype.confirmPayment = function () {
        var _this = this;
        this.addCourseStudent();
        var status = 'already';
        var payDate = this.dataTutor.getCurrentDate();
        var payTime = this.dataTutor.getCurrentTime();
        var stuid_status = this.studentId + '_' + status;
        this.dataTutor.getPayment().update(this.paymentDetail.$key, {
            payTime: payTime,
            payDate: payDate,
            status: status,
            stuid_status: stuid_status
        }).then(function () {
            var alert = _this.alert.create({
                title: 'ชำระเงินเรียบร้อย',
                subTitle: 'คุณชำระเงินเรียบร้อย',
                buttons: ['เรียบร้อย']
            });
            alert.present();
            _this.navCtrl.parent.select(3);
        });
    };
    ConfirmPage.prototype.addCourseStudent = function () {
        var _this = this;
        this.courseStudent.studentId = this.paymentDetail.studentId;
        this.courseStudent.CourseName = this.paymentDetail.CourseName;
        this.courseStudent.courseId = this.paymentDetail.courseId;
        this.courseStudent.registDate = this.paymentDetail.registDate;
        this.courseStudent.subjName = this.paymentDetail.subjName;
        var getHourByCourseId = this.angularFire.list(this.dataTutor.coursePath, {
            query: {
                orderByKey: true,
                equalTo: this.paymentDetail.courseId
            }
        });
        getHourByCourseId.forEach(function (item) {
            var Hr = Object.keys(item).map(function (key) { return item[key]; });
            _this.courseStudent.amountHr = Hr[0].hour;
            _this.dataTutor.getCourseStudent().push(_this.courseStudent);
        });
        console.log('Hello');
    };
    ConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/confirm/confirm.html"*/'<!--\n  Generated template for the FormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>ยืนยันการชำระเงิน</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    \n    <ion-item>\n      <ion-label>ชื่อคอร์ส:</ion-label>\n      <ion-label class="right">{{paymentDetail.CourseName}}</ion-label>\n    </ion-item> \n    <ion-item>\n      <ion-label>รหัสคอร์ส:</ion-label>\n      <ion-label class="right">{{paymentDetail.courseId}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>วิชา:</ion-label>\n      <ion-label class="right">{{paymentDetail.subjName}}</ion-label>\n    </ion-item>  \n    <ion-item>\n      <ion-label>จำนวนเงิน:</ion-label>\n      <ion-label class="right">{{paymentDetail.price}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-buttons text-center>\n    <button ion-button round (click)="confirmPayment()">\n      ยืนยันการชำระเงิน\n    </button>\n  </ion-buttons>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/confirm/confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], ConfirmPage);
    return ConfirmPage;
}());

//# sourceMappingURL=confirm.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ConfirmDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfirmDetailPage = (function () {
    function ConfirmDetailPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.paymentDetail = this.navParams.data;
    }
    ConfirmDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfirmDetailPage');
        this.viewCtrl.setBackButtonText('');
    };
    ConfirmDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm-detail',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/confirm-detail/confirm-detail.html"*/'<!--\n  Generated template for the ConfirmDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="school">\n    <ion-title>Confirm Detail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    \n    <ion-item>\n      <ion-label>ชื่อคอร์ส:</ion-label>\n      <ion-label class="right">{{paymentDetail.CourseName}}</ion-label>\n    </ion-item>   \n    <ion-item>\n      <ion-label>รหัสคอร์ส:</ion-label>\n      <ion-label class="right">{{paymentDetail.courseId}}</ion-label>\n    </ion-item>   \n    <ion-item>\n      <ion-label>วิชา:</ion-label>\n      <ion-label class="right">{{paymentDetail.subjName}}</ion-label>\n    </ion-item>    \n    <ion-item>\n      <ion-label>จำนวนเงิน:</ion-label>\n      <ion-label class="right">{{paymentDetail.price}}</ion-label>\n    </ion-item>\n    <ion-item>\n      <ion-label>สถานะการชำระ:</ion-label>\n      <ion-label class="right">{{paymentDetail.status}}</ion-label>\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/confirm-detail/confirm-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ConfirmDetailPage);
    return ConfirmDetailPage;
}());

//# sourceMappingURL=confirm-detail.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HetlpPaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the HetlpPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HetlpPaymentPage = (function () {
    function HetlpPaymentPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.slides = [
            {
                image: "payment1.png",
            },
            {
                image: "payment2.png",
            },
            {
                image: "payment3.png",
            },
        ];
    }
    HetlpPaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HetlpPaymentPage');
    };
    HetlpPaymentPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    HetlpPaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-hetlp-payment',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/hetlp-payment/hetlp-payment.html"*/'<!--\n  Generated template for the HetlpPaymentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n  <ion-slides pager>\n    <ion-slide *ngFor="let img of slides">\n      <ion-toolbar color="white">\n        <ion-buttons end>\n          <button ion-button color="primary" (click)="close()">ข้าม</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="img.image" />\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/hetlp-payment/hetlp-payment.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]) === "function" && _c || Object])
    ], HetlpPaymentPage);
    return HetlpPaymentPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=hetlp-payment.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionPage; });
/* unused harmony export chatting */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionPage = (function () {
    function QuestionPage(builder, alertCtrl, navCtrl, navParams, menu, angularfire, camera, alert, actionSheet, dataTutor) {
        this.builder = builder;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menu = menu;
        this.angularfire = angularfire;
        this.camera = camera;
        this.alert = alert;
        this.actionSheet = actionSheet;
        this.dataTutor = dataTutor;
        this.chatTime = new Date();
        this.Photos = '';
        this.storageRef = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.storage().ref();
        this.message = '';
        this.errorMessage = '';
        this.pathPhoto = "";
        this.chats = this.dataTutor.getChats();
        this.name = this.dataTutor.studentData.username;
        console.log('name' + this.name);
        this.pages = ['Home', 'List'];
        menu.enable(true);
        this.sendMessage = this.builder.group({
            'message': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    }
    QuestionPage.prototype.ngAfterViewChecked = function () {
        this.myScrollContainer.nativeElement.scrollTop =
            this.myScrollContainer.nativeElement.scrollHeight;
    };
    QuestionPage.prototype.validate = function () {
        var errorMsg;
        if (this.sendMessage.valid) {
            return true;
        }
        var controlMsg = this.sendMessage.controls['message'];
        if (controlMsg.invalid) {
            if (controlMsg.errors['required']) {
                errorMsg = 'Please provide a message.';
            }
        }
        this.errorMessage = errorMsg;
        return false;
    };
    QuestionPage.prototype.sendMsg = function () {
        this.message = this.sendMessage.value.message;
        var chatTemp = {
            messages: this.message,
            username: this.name,
            Photo: this.pathPhoto
        };
        this.dataTutor.getChats().push(chatTemp);
        this.pathPhoto = '';
        this.message = '';
    };
    QuestionPage.prototype.clear = function () {
        this.pathPhoto = '';
    };
    QuestionPage.prototype.editPhoto = function () {
        var _this = this;
        var options = {
            buttonLabels: ['Take Photo', 'Choose Photo'],
            addCancelButtonWithLabel: 'Cancel',
            androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
        };
        this.actionSheet.show(options).then(function (buttonIndex) {
            console.log('Button pressed: ' + buttonIndex);
            _this.takeSelfie(buttonIndex);
        });
    };
    QuestionPage.prototype.takeSelfie = function (sourcePhoto) {
        var _this = this;
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourcePhoto,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(function (profilePicture) {
            // Send the picture to Firebase Storage
            _this.Photos = 'data:image/png;base64,' + profilePicture;
            var selfieRef = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.storage().ref('/photoDate/' + _this.dataTutor.getCurrentTime());
            selfieRef
                .putString(profilePicture, 'base64', { contentType: 'image/png' })
                .then(function (savedProfilePicture) {
                __WEBPACK_IMPORTED_MODULE_6_firebase___default.a
                    .database()
                    .ref('/Photo/')
                    .push(savedProfilePicture.downloadURL);
                console.log(profilePicture);
                _this.pathPhoto = savedProfilePicture.downloadURL;
            }, function (error) {
                console.log("ERROR -> " + JSON.stringify(error));
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('scrollMe'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], QuestionPage.prototype, "myScrollContainer", void 0);
    QuestionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-question',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/question/question.html"*/'<!--\n  Generated template for the QuestionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header style="text-align: center;">\n	<ion-navbar color="school">\n		<button end ion-button menuToggle>\n			<ion-icon name="md-more"></ion-icon>\n		</button>\n		<ion-title>ถาม-ตอบ</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n	<div #scrollMe style="overflow: auto; height: 100%;">\n		<ion-list no-lines style="margin-right: -5%;">\n			<ion-item *ngFor="let chat of chats | async" class="positionChat">\n				<ion-label style="color:#0B2161">\n					<span style="font-size:15px">\n						<b>{{chat.username}} :</b>\n					</span>\n					<span class="nameCoinsSet">{{chat.messages}}\n						<br>\n						<div *ngIf="chat.Photo.length>1">\n							<img src="{{chat.Photo}}">\n						</div>\n					</span>\n				</ion-label>\n			</ion-item>\n		</ion-list>\n	</div>\n\n</ion-content>\n<ion-footer>\n	<ion-toolbar color="bgToolbar">\n		<span class="username">\n			<b>{{name}} </b>\n		</span>\n		<br>\n		<form [formGroup]="sendMessage">\n			<input placeholder="ข้อความของคุณ..." [(ngModel)]="message" formControlName="message" />\n\n			<button (click)="sendMsg()">\n				<ion-icon name="send"></ion-icon>\n			</button>\n			&nbsp;&nbsp;&nbsp;\n			<button end (click)="editPhoto()">\n				<ion-icon name="camera"></ion-icon>\n			</button>\n\n		</form>\n\n		<div *ngIf="pathPhoto.length>1" text-center>\n			<ion-buttons (click)="clear()">\n				<button icon-only>\n					<ion-icon name="close"></ion-icon>\n					<img src="{{pathPhoto}}" />\n				</button>\n			</ion-buttons>\n		</div>\n		<span class="error"> {{errorMessage}} </span>\n	</ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/question/question.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_action_sheet__["a" /* ActionSheet */],
            __WEBPACK_IMPORTED_MODULE_7__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], QuestionPage);
    return QuestionPage;
}());

var chatting = (function () {
    function chatting() {
    }
    return chatting;
}());

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__splash_splash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(alert, angularfire, formBuilder, ViewCtrl, navCtrl, navParams, dataTutor) {
        var _this = this;
        this.alert = alert;
        this.angularfire = angularfire;
        this.formBuilder = formBuilder;
        this.ViewCtrl = ViewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.student = {
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
        this.errorRepassword = '';
        this.navCtrl = navCtrl;
        this.authForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(20)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6)])],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*')])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[a-zA-Z]*')])],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
            tel: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern('[0-9]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(10), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].maxLength(10)])],
            address: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            repassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
        dataTutor.getStudents().subscribe(function (data) {
            _this.getStudent = data;
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
        this.ViewCtrl.setBackButtonText('');
    };
    RegisterPage.prototype.onSubmit = function () {
        if (this.checUsername()) {
            this.generateStuId();
            if (this.authForm.valid) {
                this.student.user_pass = this.student.username + '_' + this.student.password;
                this.dataTutor.getStudents().push(this.student);
                var alert_1 = this.alert.create({
                    title: 'สมัครเรียบร้อย',
                    buttons: ['ตกลง']
                });
                alert_1.present();
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__splash_splash__["a" /* SplashPage */]);
            }
        }
        else {
            var alert_2 = this.alert.create({
                title: 'ชื่อบัญชีมีผู้ใช้แล้ว',
                buttons: ['ตกลง']
            });
            alert_2.present();
        }
    };
    RegisterPage.prototype.generateStuId = function () {
        console.log('length ' + this.getStudent.length);
        if (this.getStudent.length == 0) {
            this.student.studentId = 10001;
        }
        else {
            this.student.studentId = +(this.getStudent[this.getStudent.length - 1].studentId);
            this.student.studentId = this.student.studentId + 1;
            console.log(this.student.studentId);
        }
    };
    RegisterPage.prototype.checUsername = function () {
        var result;
        for (var i = 0; i < this.getStudent.length; i++) {
            if (this.getStudent[i].username === this.student.username) {
                console.log('from firebase :' + this.getStudent[i].username);
                console.log('from input :' + this.student.username);
                result = false;
                break;
            }
            else {
                result = true;
            }
        }
        console.log(result);
        return result;
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="school">\n    <ion-title>สร้างบัญชี</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding text-center>\n  <form [formGroup]="authForm" (ngSubmit)="onSubmit(authForm.value)">\n    <!-- <ion-list > -->\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.username.valid && authForm.controls.username.touched}">\n      <ion-label stacked>ชื่อบัญชี :</ion-label>\n      <ion-input class="padding" formControlName="username" type="text" placeholder="     กรอกชื่อผู้ใช้" [(ngModel)]="student.username"></ion-input>\n    </ion-item>   \n      <p *ngIf="authForm.controls.username.hasError(\'required\') && authForm.controls.username.touched">จำเป็นต้องกรอกชื่อผู้ใช้!</p>\n      <p *ngIf="authForm.controls.username.hasError(\'pattern\') && authForm.controls.username.touched">เฉพาะตัวอักษร และ ตัวเลขเท่านั้น!</p>\n      <p *ngIf="authForm.controls.username.hasError(\'minlength\') && authForm.controls.username.touched">ชื่อผู้ใช้อย่างน้อย 6 ตัว!</p>\n      <p *ngIf="authForm.controls.username.hasError(\'maxlength\') && authForm.controls.username.touched">ชื่อผู้ใช้ต้องไม่เกิน 20 ตัว!</p>\n   \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.password.valid && authForm.controls.password.touched}">\n      <ion-label stacked>รหัสผ่าน :</ion-label>\n      <ion-input class="padding" formControlName="password" type="password" placeholder="     กรอกรหัสผ่าน" [(ngModel)]="student.password"></ion-input>\n    </ion-item> \n      <p *ngIf="authForm.controls.password.hasError(\'required\') && authForm.controls.password.touched">จำเป็นต้องกรอกรหัสผ่าน!</p>\n      <p *ngIf="authForm.controls.password.hasError(\'minlength\') && authForm.controls.password.touched">รหัสผ่านอย่างน้อย 6 ตัว!</p>\n    \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.repassword.valid && authForm.controls.repassword.touched}">\n      <ion-label stacked>รหัสผ่านอีกครั้ง :</ion-label>\n      <ion-input class="padding" formControlName="repassword" type="password" placeholder="     กรอกรหัสผ่านอีกครั้ง"></ion-input>\n    </ion-item>\n      <p *ngIf="authForm.controls.repassword.hasError(\'required\') && authForm.controls.repassword.touched">จำเป็นต้องกรอกรหัสผ่านอีกครั้ง!</p>\n      <p *ngIf="authForm.controls.repassword.value != authForm.controls.password.value && authForm.controls.repassword.touched">รหัสผ่านไม่ตรงกัน!</p>\n    \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.firstname.valid && authForm.controls.firstname.touched}">\n      <ion-label stacked>ชื่อจริง :</ion-label>\n      <ion-input class="padding" formControlName="firstname" type="text" placeholder="     กรอกชื่อจริง" [(ngModel)]="student.fname"></ion-input>\n    </ion-item>\n      <p *ngIf="authForm.controls.firstname.hasError(\'required\') && authForm.controls.firstname.touched">จำเป็นต้องกรอกชื่อจริง!</p>\n      <p *ngIf="authForm.controls.firstname.hasError(\'pattern\') && authForm.controls.firstname.touched">เฉพาะตัวอักษรภาษาอังกฤษเท่านั้น!</p>\n    \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.lastname.valid && authForm.controls.lastname.touched}">\n      <ion-label stacked>นามสกุล :</ion-label>\n      <ion-input class="padding" formControlName="lastname" type="text" placeholder="     กรอกนามสกุล" [(ngModel)]="student.lname"></ion-input>\n    </ion-item>\n      <p *ngIf="authForm.controls.lastname.hasError(\'required\') && authForm.controls.lastname.touched">จำเป็นต้องกรอกนามสกุล!</p>\n      <p *ngIf="authForm.controls.lastname.hasError(\'pattern\') && authForm.controls.lastname.touched">เฉพาะตัวอักษรภาษาอังกฤษเท่านั้น!</p>\n    \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.email.valid && authForm.controls.email.touched}">\n      <ion-label stacked>Email :</ion-label>\n      <ion-input class="padding" formControlName="email" type="text" placeholder="     กรอก Email" [(ngModel)]="student.email"></ion-input>\n    </ion-item>   \n      <p *ngIf="authForm.controls.email.hasError(\'required\') && authForm.controls.email.touched">จำเป็นต้องกรอก Email!</p>\n      <p *ngIf="authForm.controls.email.hasError(\'pattern\') && authForm.controls.email.touched">ตัวอย่าง: john@doe.com</p>\n  \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.tel.valid && authForm.controls.tel.touched}">\n      <ion-label stacked>เบอร์โทร :</ion-label>\n      <ion-input class="padding" formControlName="tel" type="text" placeholder="     กรอกเบอร์โทร" [(ngModel)]="student.tel"></ion-input>\n    </ion-item>\n      <p *ngIf="authForm.controls.tel.hasError(\'required\') && authForm.controls.tel.touched">จำเป็นต้องกรอกรหัสผ่าน!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'pattern\') && authForm.controls.tel.touched">เฉพาะตัวเลขเท่านั้น!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'minlength\') && authForm.controls.tel.touched">ตัวเลข 10 หลักเท่านั้น!</p>\n      <p *ngIf="authForm.controls.tel.hasError(\'maxlength\') && authForm.controls.tel.touched">ตัวเลข 10 หลักเท่านั้น!</p>\n    \n\n    <ion-item no-lines [ngClass]="{\'error-border\':!authForm.controls.address.valid && authForm.controls.address.touched}">\n      <ion-label stacked>ที่อยู่ :</ion-label>\n      <ion-input class="padding" formControlName="address" type="text" placeholder="     กรอกที่อยู่" [(ngModel)]="student.address"></ion-input>\n    </ion-item> \n      <p *ngIf="authForm.controls.address.hasError(\'required\') && authForm.controls.address.touched">จำเป็นต้องกรอกที่อยู่!</p>\n    \n\n    <!-- </ion-list> -->\n    <button ion-button round color="primary" [disabled]="!authForm.valid" class="create" type="submit">สร้าง</button>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(264);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export config */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_time_modal_time_modal__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_logon_logon__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_book_book__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_course_course__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_question_question__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_course_detail_course_detail__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_subject_subject__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_confirm_confirm__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_confirm_detail_confirm_detail__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_cancel_book_cancel_book__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_hist_book_hist_book__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_schedule_schedule__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_booking_detail_booking_detail__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_map__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__angular_http__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_action_sheet__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_time_popover_time_popover__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_help_course_help_course__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_help_schedule_help_schedule__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_hetlp_payment_hetlp_payment__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_help_history_help_history__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_storage__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var config = {
    apiKey: "AIzaSyAX5G8jj-kjMjNA1xDzpJhAwbKWzF0xusE",
    authDomain: "tutor7093.firebaseapp.com",
    databaseURL: "https://tutor7093.firebaseio.com",
    projectId: "tutor7093",
    storageBucket: "tutor7093.appspot.com",
    messagingSenderId: "233233284676"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_time_modal_time_modal__["a" /* TimeModalPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_cancel_book_cancel_book__["a" /* CancelBookPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_hist_book_hist_book__["a" /* HistBookPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_booking_detail_booking_detail__["a" /* BookingDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_time_popover_time_popover__["a" /* TimePopoverPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_book_book__["a" /* BookPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_course_course__["a" /* CoursePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_logon_logon__["a" /* LogonPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_course_detail_course_detail__["a" /* CourseDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_subject_subject__["a" /* SubjectPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_confirm_detail_confirm_detail__["a" /* ConfirmDetailPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_help_course_help_course__["a" /* HelpCoursePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_help_schedule_help_schedule__["a" /* HelpSchedulePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_hetlp_payment_hetlp_payment__["a" /* HetlpPaymentPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_help_history_help_history__["a" /* HelpHistoryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                // Http,
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_25__angular_http__["b" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_time_modal_time_modal__["a" /* TimeModalPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_cancel_book_cancel_book__["a" /* CancelBookPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_hist_book_hist_book__["a" /* HistBookPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_booking_detail_booking_detail__["a" /* BookingDetailPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_schedule_schedule__["a" /* SchedulePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_time_popover_time_popover__["a" /* TimePopoverPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_book_book__["a" /* BookPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_course_course__["a" /* CoursePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_splash_splash__["a" /* SplashPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_logon_logon__["a" /* LogonPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_course_detail_course_detail__["a" /* CourseDetailPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_subject_subject__["a" /* SubjectPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_confirm_detail_confirm_detail__["a" /* ConfirmDetailPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_help_course_help_course__["a" /* HelpCoursePage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_help_schedule_help_schedule__["a" /* HelpSchedulePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_hetlp_payment_hetlp_payment__["a" /* HetlpPaymentPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_help_history_help_history__["a" /* HelpHistoryPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_action_sheet__["a" /* ActionSheet */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_36__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(dataTutor, platform, statusBar, splashScreen) {
        var _this = this;
        this.dataTutor = dataTutor;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            // this.dataTutor.addToFirebase();
            _this.checkPreviousAuthorization();
        });
    }
    MyApp.prototype.checkPreviousAuthorization = function () {
        if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
            (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_splash_splash__["a" /* SplashPage */];
            this.rootPage.hideTabs = '';
        }
        else {
            this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */];
        }
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/app/app.html"*/'<ion-nav #myNav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the BookingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BookingDetailPage = (function () {
    function BookingDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BookingDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BookingDetailPage');
    };
    BookingDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booking-detail',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/booking-detail/booking-detail.html"*/'<!--\n  Generated template for the BookingDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>bookingDetail</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/booking-detail/booking-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], BookingDetailPage);
    return BookingDetailPage;
}());

//# sourceMappingURL=booking-detail.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SplashPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logon_logon__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SplashPage = (function () {
    function SplashPage(navCtrl, navParams, dataTutor, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTutor = dataTutor;
        this.alert = alert;
        this.open = '9.00';
        this.close = '21.00';
    }
    SplashPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SplashPage');
    };
    SplashPage.prototype.register = function () {
        if (this.checkTimeOpenAndClose()) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
        }
        else {
            var alert_1 = this.alert.create({
                title: 'ระบบเปิดเวลา 9.00 น.',
                subTitle: 'ขออภัยในความไม่สะดวก',
                buttons: ['ตกลง']
            });
            alert_1.present();
        }
    };
    SplashPage.prototype.logon = function () {
        // if (this.checkTimeOpenAndClose()) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__logon_logon__["a" /* LogonPage */]);
        // } else {
        //   let alert = this.alert.create({
        //     title: 'ระบบเปิดเวลา 9.00 น.',
        //     subTitle: 'ขออภัยในความไม่สะดวก',
        //     buttons: ['ตกลง']
        //   });
        //   alert.present();
        // }
    };
    SplashPage.prototype.checkTimeOpenAndClose = function () {
        var open;
        var close;
        var currentHr;
        var currentMin;
        open = parseInt(this.open.substr(0, 2));
        close = parseInt(this.close.substr(0, 2));
        currentHr = this.dataTutor.parseIntSubStrHourCurrentTimeforCheck();
        currentMin = this.dataTutor.parseIntSubStrMinuteCurrentTimeforCheck();
        if (currentHr >= open && currentHr <= close) {
            return true;
        }
        else {
            return false;
        }
    };
    SplashPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-splash',template:/*ion-inline-start:"/Users/weerapat/tutor_project/src/pages/splash/splash.html"*/'<!--\n  Generated template for the SplashPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n    \n<ion-content fullscreen>\n      <ion-buttons text-center>\n        <button ion-button round (click)="register()" class="create">\n          สร้างบัญชี\n        </button>\n      </ion-buttons>\n      \n  <div class="or" text-center>\n    หรือ\n  </div>\n\n  <ion-buttons text-center>\n    <button ion-button round (click)="logon()" class="logon">\n      เข้าสู่ระบบ\n    </button>\n  </ion-buttons>\n</ion-content>\n'/*ion-inline-end:"/Users/weerapat/tutor_project/src/pages/splash/splash.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_tutor_data_tutor__["a" /* DataTutorProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], SplashPage);
    return SplashPage;
}());

//# sourceMappingURL=splash.js.map

/***/ })

},[242]);
//# sourceMappingURL=main.js.map