import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import {FiltersPage}   from '../filters/filters.page';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html',
  entryComponents: [FiltersPage]
})

export class SearchPage {
  selectedCategory: string;
  results: any[];
  categories: string[];

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];

    this.results = [{ Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' }
                  ];
  }

  gotoFiltersPage() {
    //this.navCtrl.push(FiltersPage, {});
    let profileModal = this.navCtrl.push(FiltersPage, { userId: 8675309 });
  }

  getItems(){


  }
}
