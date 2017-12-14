import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { TimeModalPage } from '../pages/time-modal/time-modal';
import { RegisterPage } from '../pages/register/register';
import { SplashPage } from '../pages/splash/splash';
import { LogonPage } from '../pages/logon/logon';
import { BookPage } from '../pages/book/book';
import { PaymentPage } from '../pages/payment/payment';
import { CoursePage} from '../pages/course/course';
import { HomePage } from '../pages/home/home';
import { QuestionPage } from '../pages/question/question';
import { TabsPage } from '../pages/tabs/tabs';
import { CourseDetailPage} from '../pages/course-detail/course-detail';
import { SubjectPage} from '../pages/subject/subject';
import { ConfirmPage} from '../pages/confirm/confirm';
import { ConfirmDetailPage} from '../pages/confirm-detail/confirm-detail';
import { CancelBookPage } from '../pages/cancel-book/cancel-book';
import { HistBookPage } from '../pages/hist-book/hist-book';
import { SchedulePage } from '../pages/schedule/schedule';
import { BookingDetailPage } from '../pages/booking-detail/booking-detail';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ActionSheet } from '@ionic-native/action-sheet' ;
import { TimePopoverPage } from '../pages/time-popover/time-popover';
import { HelpCoursePage } from '../pages/help-course/help-course';
import { HelpSchedulePage } from '../pages/help-schedule/help-schedule';
import { HetlpPaymentPage } from '../pages/hetlp-payment/hetlp-payment';
import { HelpHistoryPage } from '../pages/help-history/help-history';

import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataTutorProvider } from '../providers/data-tutor/data-tutor';

export const config = {
  apiKey: "AIzaSyAX5G8jj-kjMjNA1xDzpJhAwbKWzF0xusE",
    authDomain: "tutor7093.firebaseapp.com",
    databaseURL: "https://tutor7093.firebaseio.com",
    projectId: "tutor7093",
    storageBucket: "tutor7093.appspot.com",
    messagingSenderId: "233233284676"
};

@NgModule({
  declarations: [
    MyApp,
    TimeModalPage,
    CancelBookPage,
    HistBookPage,
    BookingDetailPage,
    SchedulePage,
    TimePopoverPage,
    QuestionPage,
    BookPage,
    CoursePage,
    PaymentPage,
    HomePage,
    SplashPage,
    RegisterPage,
    LogonPage,
    TabsPage,
    CourseDetailPage,
    SubjectPage,
    ConfirmPage,
    ConfirmDetailPage,
    HelpCoursePage,
    HelpSchedulePage,
    HetlpPaymentPage,
    HelpHistoryPage
  ],
  imports: [
    BrowserModule,
    // Http,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimeModalPage,
    CancelBookPage,
    HistBookPage,
    BookingDetailPage,
    SchedulePage,
    TimePopoverPage,
    QuestionPage,
    BookPage,
    CoursePage,
    PaymentPage,
    HomePage,
    SplashPage,
    RegisterPage,
    LogonPage,
    TabsPage,
    CourseDetailPage,
    SubjectPage,
    ConfirmPage,
    ConfirmDetailPage,
    HelpCoursePage,
    HelpSchedulePage,
    HetlpPaymentPage,
    HelpHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera,
    ActionSheet,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataTutorProvider,
   
    
  ]
})
export class AppModule {}
