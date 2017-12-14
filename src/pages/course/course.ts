import { ViewChild, Component } from '@angular/core';
import { ViewController, NavController, NavParams, Content } from 'ionic-angular';
import { CourseDetailPage } from '../../pages/course-detail/course-detail';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataTutorProvider } from '../../providers/data-tutor/data-tutor';
/**
 * Generated class for the CoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
})
export class CoursePage {
  quotesList: Array<any> = [];

  @ViewChild(Content) content: Content
  shown: boolean;
  filterCourse: Array<any> = [];
  isFiltered: boolean;
  showCourses: FirebaseListObservable<any[]>;
  getCourse: any[] = [];

  constructor(public angularFire: AngularFireDatabase, 
    public viewCtrl: ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataTutor: DataTutorProvider) {

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

    //   })
    // });
    this.dataTutor.getCourseBySubjName(navParams.get('subjName')).subscribe(data=>{
      this.getCourse = data;
    })
  }


  searchCourse(event) {
    if (event.target.value) {
      if (event.target.value.length > 0) {
        let filterJson = this.getCourse.filter(row => {
          if (row.CourseName.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
            return true;
          } else {
            return false;
          }
        }
        );

        this.isFiltered = true;
        this.filterCourse = filterJson;
        if (this.filterCourse.length <= 0) {
          this.shown = false;
        } else {
          this.shown = true;
        }

      } else {
        this.isFiltered = false;
      }
    } else {
      this.isFiltered = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoursePage');
    this.viewCtrl.setBackButtonText('');
  }

  courseDetail(course) {
    this.navCtrl.push(CourseDetailPage, course);
    console.log(course);
  }

}
