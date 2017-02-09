import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product.page';
import { PostNewAdPage } from '../postnewad/postnewad.page';
import { Post } from '../../app/models/post';
import { IPostService, PostService } from '../../app/services/post.service';

@Component({
    selector: 'my-postings-page',
    templateUrl: 'my-postings.html'
})
export class MyPostingsPage implements OnInit {
    selectedCategory: string;
    items: string[];
    subCategories: string[];
    isSubCategorySelected: boolean;
    myPostingsData: Array<Post>;

    constructor(public navCtrl: NavController, public navParams: NavParams, @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.isSubCategorySelected = false;
        this.selectedCategory = navParams.get('category');
        this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];

        this.items = [
            'Amsterdam',
            'Bogota'
        ];       
    }


    ngOnInit() {
        this.getMyPostingsData();
    }

    getMyPostingsData() {
        this.postService.get().subscribe((response) => {
            this.myPostingsData = response
        });
    }

    showProductDetails(item: string) {
        this.navCtrl.push(ProductPage, { category: item });
    }

    gotoAddPostingsPage(){
        this.navCtrl.push(PostNewAdPage);
    }
}
