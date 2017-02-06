import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductPage} from '../product/product.page';

@Component({
  selector: 'my-postings-page',
  templateUrl: 'my-postings.html'
})
export class MyPostingsPage {
  selectedCategory: string;
  items: string[];
  subCategories: string[];
  isSubCategorySelected: boolean;
  ads: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];

    this.items = [
      'Amsterdam',
      'Bogota'
    ];

    this.ads = [{
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

  showProductDetails(item: string) {
    this.navCtrl.push(ProductPage, { category: item });
  }
}
