import { Component, Inject, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification.page';
import { AddEditPostPage } from '../post/addEditPost.page';
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
  canEdit: string;
  similarPosts: Array<Post>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(PostService) public postService: IPostService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.canEdit = navParams.get('canEdit');
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
        this.getSimilarPosts();
      }
    });
  }

  getSimilarPosts() {
    var params = new URLSearchParams();
    params.set('Category', this.post.Category);

    this.postService.getAllByQuery(params).subscribe((response) => {
      var items = new Array<Post>();
      if (response) {
        response.forEach(element => {
          if (this.post._id !== element._id) {
            items.push(element);
          }
        });
        this.similarPosts = items;
      }
    });
  }

  showDetails(post: Post) {
    this.post = post;
  }

  editPost() {
    this.navCtrl.push(AddEditPostPage, { _id: this.postId });
  }

  gotoNotificationPage() {
    this.navCtrl.push(NotificationPage);
  }

  showProductDetails(itemId: string) {
    this.postId = itemId;
    this.getPost();
  }
}
