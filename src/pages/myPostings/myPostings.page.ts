import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PostDetailsPage } from '../post/postDetails.page';
import { AddEditPostPage } from '../post/addEditPost.page';
import { LoginPage } from '../account/login.page';
import { Post } from '../../app/models/post';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';

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
    private isUserAuthenticated: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param

        //this.navCtrl.pop();
    }

    ngOnInit() {
        this.isUserAuthenticated = this.authGuard.canActivate();
        if (!this.isUserAuthenticated) {
            this.navCtrl.setRoot(LoginPage);
        } else {
            this.getMyPostingsData();
        }
    }

    getMyPostingsData() {
        this.postService.get().subscribe((response) => {
            this.myPostingsData = response
        });
    }

    showProductDetails(itemId: string) {
        this.navCtrl.push(PostDetailsPage, { canEdit:true, _id : itemId });
    }

    gotoAddPostingsPage() {
        this.navCtrl.push(AddEditPostPage);
    }
}
