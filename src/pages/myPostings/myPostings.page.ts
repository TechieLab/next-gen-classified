import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostDetailsPage } from '../post/postDetails.page';
import { PostNewAdPage } from '../post/postnewad.page';
import { Post } from '../../app/models/post';
import { IPostService, PostService } from '../post/post.service';

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
        
    }


    ngOnInit() {
        this.getMyPostingsData();
    }

    getMyPostingsData() {

        this.postService.get().subscribe((response) => {
            this.myPostingsData = response
        });
    }

    showProductDetails(itemId: string) {
        this.navCtrl.push(PostDetailsPage, { _id: itemId });
    }

    gotoAddPostingsPage(){
        this.navCtrl.push(PostNewAdPage);
    }
}
