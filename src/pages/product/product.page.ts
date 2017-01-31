import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NotificationPage} from '../notification/notification.page';

@Component({
  selector: 'product-page',
  templateUrl: 'product.html'
})
export class ProductPage {
  selectedItem: any;
  similarItems : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.similarItems = [{}, {}, {}];
  }

   gotoNotificationPage() {
        this.navCtrl.push(NotificationPage, {
            id: "123",
            name: "Carl"
        });
    }

    getItems(){

    }
}
