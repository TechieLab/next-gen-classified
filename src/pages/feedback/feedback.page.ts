import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Rating} from '../../app/components/rating';

@Component({
  selector: 'feedback-page',
  templateUrl: 'feedback.html',
  entryComponents : [Rating]
})
export class FeedbackPage { 
  private feedback : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.feedback = {};
  }
}
