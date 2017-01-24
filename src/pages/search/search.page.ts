import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'search-page',
  templateUrl: 'search.html'
})
export class SearchPage {
  selectedCategory: string;
  results: any[];
  categories: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedCategory = navParams.get('category');
    this.categories = ["Mobile", "Electronics", "Home", "Entertainment", "Pet Care", "Education"];

    this.results = [{ Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' },
                  { Title: 'Mouse', Price: '200' }
                  ];
  }

  onCategorySelection() {

  }
}
