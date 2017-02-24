import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification.page';
import { PostService, IPostService } from './post.service';
import { Post } from '../../app/models/post';
import { Product } from '../../app/models/product';
import { Media } from '../../app/models/media';

@Component({
  selector: 'post-details-page',
  templateUrl: 'postDetails.html',
  providers: [PostService]
})
export class PostDetailsPage implements OnInit {
  postId: string;
  post: Post;
  similarPosts: Array<Post>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(PostService) public postService: IPostService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.postId = navParams.get('_id');
    this.post = new Post();
    this.similarPosts = new Array<Post>();
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getById(this.postId).subscribe((response) => {
      if (response) {
        this.post = response;
        var media = new Media();
        media.ImageUrl = "https://ionicframework.com/dist/preview-app/www/assets/img/card-madison.png";
        this.post.Product.Photos.push(media);
        this.post.Product.Photos.push(media);
        this.post.Product.Photos.push(media);
        this.post.Product.Photos.push(media);

        this.getSimilarPosts();
      }
    });
  }

  getSimilarPosts() {
    var params = new URLSearchParams();
    params.set('Category', this.post.Category);

    this.postService.getAllByQuery(params).subscribe((response) => {
      if (response) {
        this.similarPosts = response;
      }
    });
  }

  showDetails(post: Post) {
    this.post = post;
  }

  gotoNotificationPage() {
    this.navCtrl.push(NotificationPage);
  }
}
