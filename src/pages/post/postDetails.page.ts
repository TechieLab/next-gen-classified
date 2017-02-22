import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationPage } from '../notification/notification.page';
import { PostService, IPostService } from './post.service';
import { Post } from '../../app/models/post';
import { Product } from '../../app/models/product';

@Component({
  selector: 'post-details-page',
  templateUrl: 'postDetails.html',
  providers: [PostService]
})
export class PostDetailsPage implements OnInit {
  postId: string;
  post: Post;  
  product : Product;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(PostService) public postService: IPostService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.postId = navParams.get('_id');
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.postService.getById(this.postId).subscribe((response) => {
      if(response){
        this.post = response;
        this.product = response.Product
      }
    });
  }

  gotoNotificationPage() {
    this.navCtrl.push(NotificationPage);
  }
}
