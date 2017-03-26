import { Subscriber, Observable } from 'rxjs';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PostDetailsPage } from '../post/postDetails.page';
import { LoginPage } from '../account/login.page';
import { Post } from '../../app/models/post';
import { Result } from '../../app/models/result';
import { IPostService, PostService } from '../post/post.service';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(AuthGuard) public authGuard: IAuthGuard,
    public toastCtrl: ToastController,
    @Inject(PostService) public postService: IPostService

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
    this.posts = new Observable<Array<Post>>();
    this.viewType = 'list';
  }

  ngOnInit() {
    this.isUserAuthenticated = this.authGuard.canActivate();
    this.posts.subscribe((result) => {
      this.postsResult = result;
      this.checkIsFavouritePost();
    });
  }
  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  checkIsFavouritePost() {
    if (this.postsResult && this.postsResult.length) {
      this.postsResult.forEach((item) => {
        item.Likes.forEach((like) => {
          if (item.UserId == like) {
            item.IsFav = true;
          }
        });
      });
    }
  }

  favouritePost(index, post: Post) {
    if (this.isUserAuthenticated) {
      this.postService.addRemoveFavorite(post._id, false).subscribe((response: Result) => {
        if (response.Success && response.Content.IsFav) {
          this.postsResult[index].IsFav = true;
          this.presentToast('Added to shortlist');
        } else {
          this.postsResult[index].IsFav = false;
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
