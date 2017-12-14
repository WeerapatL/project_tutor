import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplashPage } from '../pages/splash/splash';
import { DataTutorProvider } from '../providers/data-tutor/data-tutor';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { TimeModalPage } from '../pages/time-modal/time-modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;  

  constructor(private dataTutor: DataTutorProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.dataTutor.addToFirebase();
      this.checkPreviousAuthorization();

    });
  }

  checkPreviousAuthorization(): void {
    if ((window.localStorage.getItem('username') === "undefined" || window.localStorage.getItem('username') === null) &&
      (window.localStorage.getItem('password') === "undefined" || window.localStorage.getItem('password') === null)) {
      this.rootPage = SplashPage;
      this.rootPage.hideTabs='';
    } else {
      this.rootPage = HomePage;
    }
  }

  // ngAfterViewInit() {
  //  this.nav.push(SplashPage);
  // }

}
