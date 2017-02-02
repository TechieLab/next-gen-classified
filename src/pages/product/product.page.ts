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
    
    this.similarItems = [{
      MainImage: '',
      Title: 'Sample',
      Price: '200'
    }, {
      MainImage: '',
      Title: 'Sample 2',
      Price: '200'
    }, {
      MainImage: '',
      Title: 'Sample 345',
      Price: '200'
    }, {
      MainImage: '',
      Title: 'Sample 453',
      Price: '200'
    }];
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
