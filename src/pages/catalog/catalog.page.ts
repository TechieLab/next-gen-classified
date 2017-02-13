import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product.page';
import { Post } from '../../app/models/post';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalog.html',
  providers: []
})
export class CatalogPage implements OnInit {

  @Input() posts: Array<Post>;

  selectedCategory: string;
  subCategories: string[];
  isSubCategorySelected: boolean;
  ads: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
  }

  ngOnInit() {

  }
  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  showProductDetails(item: string) {
    this.navCtrl.push(ProductPage, { category: item });
  }
}
