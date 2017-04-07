import { Component, OnInit, Inject,EventEmitter, Input, Output } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs';
import { PostDetailsPage } from '../post/postDetails.page';
import { AddEditPostPage } from '../post/addEditPost.page';
import { HomePage } from '../home/home.page'

import { LoginPage } from '../account/login.page';
import { Post } from '../../app/models/post';
import { Result } from '../../app/models/result';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';
import { StorageService } from '../../app/services/storage.service';


@Component({
    selector: 'my-favts-page',
    templateUrl: 'my-favt.html'
})
export class MyFavtPostingPage implements OnInit {

    @Output() onPost = new EventEmitter<boolean>();

    selectedCategory: string;
    items: string[];
    subCategories: string[];
    isSubCategorySelected: boolean;
    params: URLSearchParams;
    private isUserAuthenticated: boolean = false;
    private myFavtsPostData: Array<Post> = [];
    private viewType: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        public toastCtrl: ToastController,
        public events: Events,
        @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param

        //this.navCtrl.pop();
        this.viewType ='list';
        this.params = new URLSearchParams();
    }

    ngOnInit() {
        this.isUserAuthenticated = this.authGuard.canActivate();
        if (!this.isUserAuthenticated) {
            this.navCtrl.setRoot(LoginPage);
        } else {
            this.getMyFavtPostData();
            
        }
    }

    getMyFavtPostData() {
         this.postService.getFavorite().subscribe((result) => {
            this.myFavtsPostData = result;
         });
    }


    gotoAddPostingsPage() {
        this.navCtrl.push(AddEditPostPage);
    }

}
