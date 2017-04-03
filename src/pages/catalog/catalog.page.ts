import { Subscriber, Observable } from 'rxjs';
import { Component, OnInit, Inject, Input } from '@angular/core';
import {Events , NavController, NavParams, ToastController } from 'ionic-angular';
import { PostDetailsPage } from '../post/postDetails.page';
import { LoginPage } from '../account/login.page';
import { OfferPage } from '../offers/offers.page';
import { Post } from '../../app/models/post';
import { Result } from '../../app/models/result';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';
import { StorageService } from '../../app/services/storage.service';

@Component({
  selector: 'catalog-page',
  templateUrl: 'catalog.html',
  providers: [AuthGuard]
})
export class CatalogPage implements OnInit {

  @Input() viewType: string;
  @Input() posts: Observable<Array<Post>>;

  selectedCategory: string;
  subCategories: string[];
  isSubCategorySelected: boolean;
  postsResult: Array<Post>;
  isFav: boolean = false;
  isUserAuthenticated: boolean = false;
  clientId:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(AuthGuard) public authGuard: IAuthGuard,
    public toastCtrl: ToastController,
    public events: Events,
    @Inject(PostService) public postService: IPostService

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
    this.posts = new Observable<Array<Post>>();
    this.viewType = 'list';
    this.clientId = StorageService.getItem('Client_Id');
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authGuard.canActivate();
    this.posts.subscribe((result) => {
      this.postsResult = result;
      this.checkIsFavouritePost();
    });
  }
   

    checkIsFavouritePost() {
    if (this.postsResult && this.postsResult.length) {
      this.postsResult.forEach((item) => {
        item.Likes.forEach((like) => {
          if (this.clientId == like) {
            item.isFav = true;
          }
        });
      });
    }
  }

  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  
  favouritePost(index, post: Post) {
    if (this.isUserAuthenticated) {
      this.postService.addRemoveFavorite(post._id, post.isFav).subscribe((response: Result) => {
        if (response.Success && response.Content.IsFav) {
          this.postsResult[index].isFav = true;
          this.presentToast('Added to shortlist');
           
        } else {
          this.postsResult[index].isFav = false;
          this.presentToast('Remove from shortlist');
        }
      });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  showProductDetails(itemId: string) {
    this.navCtrl.push(PostDetailsPage, { _id: itemId });
  }

  goToOffersPage(result){
    this.navCtrl.push(OfferPage,{price:result.Description.Price});
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
