import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalog.html'
})
export class CatalogPage {
  selectedCategory: string;
  items: string[];
  categories : string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category'); 
    this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];
      
    this.items = [
      'Amsterdam',
      'Bogota'
    ];   
  }
}
