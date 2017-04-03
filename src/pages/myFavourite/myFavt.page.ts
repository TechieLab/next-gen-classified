import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
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
    selectedCategory: string;
    items: string[];
    subCategories: string[];
    isSubCategorySelected: boolean;
    myFavtsPostData: Array<Post> = [];
    params: URLSearchParams;
    private isUserAuthenticated: boolean = false;
    clientId:string= '';

    constructor(public navCtrl: NavController, public navParams: NavParams,
        @Inject(AuthGuard) public authGuard: IAuthGuard,
        public toastCtrl: ToastController,
        public events: Events,
        @Inject(PostService) public postService: IPostService) {
        // If we navigated to this page, we will have an item available as a nav param

        //this.navCtrl.pop();
        this.params = new URLSearchParams();
         this.clientId = StorageService.getItem('Client_Id');
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
        this.postService.getFavorite().subscribe((response) => {
            this.myFavtsPostData = response;
            this.checkIsFavouritePost();
        });
    }

 checkIsFavouritePost() {
    if (this.myFavtsPostData && this.myFavtsPostData.length) {
      this.myFavtsPostData.forEach((item) => {
        item.Likes.forEach((like) => {
          if (this.clientId == like) {
            item.IsFav = true;
          }
        });
      });
    }
  }

  private fetchUpdatedFavtPostsCount(res:Array<Post>){
     var selectedPost = res.filter(element => {
          if(element.IsFav){
            return true;
          }
     });
    this.events.publish('favtpost:count',{post:selectedPost});
  }


    removefavouritePost(index, post: Post) {
        this.postService.addRemoveFavorite(post._id, post.IsFav).subscribe((response: Result) => {
            if (response.Success && response.Content.IsFav) {
                this.myFavtsPostData[index].IsFav = true;
                this.fetchUpdatedFavtPostsCount(this.myFavtsPostData);
                this.events.publish('remove:favouritePost');
                this.presentToast('Added to shortlist');                
                
            } else {
                 this.myFavtsPostData[index].IsFav = false;
                 this.fetchUpdatedFavtPostsCount(this.myFavtsPostData);
                 this.presentToast('Remove from shortlist');
                
              
            }
        });
    }


    showProductDetails(itemId: string) {
        this.navCtrl.push(PostDetailsPage, { canEdit: true, _id: itemId });
    }

    gotoAddPostingsPage() {
        this.navCtrl.push(AddEditPostPage);
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }
}
