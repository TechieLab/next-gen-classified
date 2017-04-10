import { Subscriber, Observable } from 'rxjs';
import { Component, OnInit, Inject, Input, OnChanges } from '@angular/core';
import { Events, NavController, NavParams, ToastController } from 'ionic-angular';
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
export class CatalogPage implements OnInit, OnChanges {

  @Input() viewType: string;
  @Input() posts: Array<Post>;

  selectedCategory: string;
  subCategories: string[];
  isSubCategorySelected: boolean;
  postsResult: Array<Post>;
  isFav: boolean = false;
  isOffered: boolean = false;
  isUserAuthenticated: boolean = false;
  clientId: string = '';
  editPermission: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(AuthGuard) public authGuard: IAuthGuard,
    public toastCtrl: ToastController,
    public events: Events,
    @Inject(PostService) public postService: IPostService

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.editPermission = navParams.get('editPermission');
    this.viewType = 'list';
    this.clientId = StorageService.getItem('Client_Id');

    this.posts = new Array<Post>();
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authGuard.canActivate();
  }

  ngOnChanges(changes) {
    if (changes && changes.posts && changes.posts.currentValue) {
      this.postsResult = changes.posts.currentValue;
      this.checkIsFavouritePost();
    }
  }

  checkIsFavouritePost() {
    if (this.postsResult && this.postsResult.length) {
      this.postsResult.forEach((item) => {
        item.Likes.forEach((like) => {
          if (this.clientId == like) {
            item.IsFav = true;
          }
        });
        item.Offers.forEach((offer) => {
          if (this.clientId == offer.UserId) {
            item.IsOffered = true;
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
      this.postService.addRemoveFavorite(post._id, post.IsFav).subscribe((response: Result) => {
        if (response.Success && response.Content.IsFav) {
          this.postsResult[index].IsFav = true;
          this.fetchUpdatedFavtPostsCount(this.postsResult);
          this.presentToast('Added to shortlist');

        } else {
          this.postsResult[index].IsFav = false;
          this.fetchUpdatedFavtPostsCount(this.postsResult);
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

  goToOffersPage(post) {
    if (this.isUserAuthenticated) {
      this.navCtrl.push(OfferPage, { price: post.Product.Description.Price, _id: post._id });
    } else {
      this.navCtrl.push(LoginPage);
    }

  }

  private fetchUpdatedFavtPostsCount(res: Array<Post>) {
    var selectedPost = res.filter(element => {
      if (element.IsFav) {
        return true;
      }
    });
    this.events.publish('favtpost:count', { post: selectedPost });
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
