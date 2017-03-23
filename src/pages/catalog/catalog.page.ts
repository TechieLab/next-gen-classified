import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostDetailsPage } from '../post/postDetails.page';
import { Post } from '../../app/models/post';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalog.html',
  providers: []
})
export class CatalogPage implements OnInit {

  @Input() viewType: string;
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
    this.posts = new Array<Post>();
    this.viewType = 'list';
  }

  ngOnInit() {

  }
  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  showProductDetails(itemId: string) {
    this.navCtrl.push(PostDetailsPage, { _id: itemId });
  }
}
