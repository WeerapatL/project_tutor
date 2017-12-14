import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SubjectPage } from '../subject/subject';
import { BookPage } from '../book/book';
import { PaymentPage } from '../payment/payment';
import { QuestionPage } from '../question/question';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SubjectPage;
  tab3Root = BookPage;
  tab4Root = PaymentPage;
  tab5Root = QuestionPage;
  constructor() {
  }
}
