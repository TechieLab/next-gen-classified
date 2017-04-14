import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification.page';
import { AddEditPostPage } from '../post/addEditPost.page';
import { OfferPage } from '../offers/offers.page';
import { LoginPage } from '../account/login.page';
import { PostService, IPostService } from './post.service';
import { Post } from '../../app/models/post';
import { Product } from '../../app/models/product';
import { Media } from '../../app/models/media';
import { AuthGuard, IAuthGuard } from '../../app/services/guard.service';
import { StorageService } from '../../app/services/storage.service';

@Component({
  selector: 'post-details-page',
  templateUrl: 'postDetails.html',
  providers: [PostService]
})
export class PostDetailsPage implements OnInit {
  postId: string;
  post: Post;
  editPermission: boolean;
  similarPosts: Array<Post>;
  detailSegment: string;
  isUserAuthenticated: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(PostService) public postService: IPostService,
    @Inject(AuthGuard) public authGuard: IAuthGuard
  ) {
    // If we navigated to this page, we will have an item available as a nav param    
    this.editPermission =  navParams.get('editPermission');
    this.postId = navParams.get('_id');
    this.post = new Post();
    this.similarPosts = new Array<Post>();
    this.detailSegment = "description";

    this.isUserAuthenticated = this.authGuard.canActivate();
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getById(this.postId).subscribe((response) => {
      if (response) {
        this.post = response;
        if (!response.Product.Photos.length) {
          var media = new Media()
          this.post.Product.Photos.push(media);
        }
        this.checkLikesAndOffers();
        this.getSimilarPosts();
      }
    });
  }

  checkLikesAndOffers() {
    var clientId = StorageService.getItem('Client_Id');
    if (this.post) {
      this.post.Likes.forEach((like) => {
        if (clientId == like) {
          this.post.IsFav = true;
        }
      });
      this.post.Offers.forEach((offer) => {
        if (clientId == offer.UserId) {
          this.post.IsOffered = true;
        }
      });
    }
  }

  getSimilarPosts() {
    var params = new URLSearchParams();
    params.set('Category', this.post.Category);

    this.postService.getByQuery(params).subscribe((response) => {
      var items = new Array<Post>();
      if (response) {
        response.forEach(element => {
          if (this.post._id !== element._id) {
            if (!element.Product.Photos.length) {
              var media = new Media();
              element.Product.Photos.push(media);
              items.push(element);
            }
          }
        });
        this.similarPosts = items;
      }
    });
  }

  showDetails(post: Post) {
    this.post = post;
  }

  goToOffersPage(post) {
    if (this.isUserAuthenticated) {
      this.navCtrl.push(OfferPage, { price: post.Product.Description.Price, _id: post._id });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }
  
  gotoNotificationPage() {
    this.navCtrl.push(NotificationPage);
  }

  showProductDetails(itemId: string) {
    this.postId = itemId;
    this.getPost();
  }
}
