import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'admin-page',
  templateUrl: 'admin.html'
})
export class AdminPage {
  selectedCategory: string;
  items: string[];
  subCategories : string[];
  isSubCategorySelected: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category'); 
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
      
    this.items = [
      'Amsterdam',
      'Bogota'
    ];   
  }

  selectSubCategory(){
    this.isSubCategorySelected = true;
  }
}
