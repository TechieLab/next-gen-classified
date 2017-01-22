import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'notification-page',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  selectedItem: any;
  notifications : Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.notifications = [{
            MainImage : '',
            Title : 'Sample',
            Price : '200'
        },{
            MainImage : '',
            Title : 'Sample 2',
            Price : '200'
        },{
            MainImage : '',
            Title : 'Sample 345',
            Price : '200'
        },{
            MainImage : '',
            Title : 'Sample 453',
            Price : '200'
        }];
  }
}
