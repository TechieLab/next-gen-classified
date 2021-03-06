import { Component, Inject, OnInit ,URLSearchParams,
  Events, ToastController, NavController, NavParams } from '../common/index';

import { NotificationPage, AddEditPostPage , OfferPage , LoginPage } from '../index';
import { PostService, IPostService } from './post.service';
import { Post,Product ,Media ,Result} from '../../app/models/index';
import { AuthGuard, IAuthGuard , StorageService } from '../../app/services/index';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    public toastCtrl: ToastController,
    @Inject(PostService) public postService: IPostService,
    @Inject(AuthGuard) public authGuard: IAuthGuard
  ) {
    // If we navigated to this page, we will have an item available as a nav param    
    this.editPermission = navParams.get('editPermission');
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
    params.set('Category', this.post.Category._id);

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

  favouritePost() {
    if (this.isUserAuthenticated) {
      this.postService.addRemoveFavorite(this.post._id, this.post.IsFav).subscribe((response: Result) => {
        if (response.Success && response.Content.IsFav) {
          this.post.IsFav = true;
          this.events.publish('favtpost:count', { post: this.post });
          this.presentToast('Added to shortlist');
        } else {
          this.post.IsFav = false;
          this.events.publish('favtpost:count', { post: this.post });
          this.presentToast('Remove from shortlist');
        }
      });
    } else {
      this.navCtrl.push(LoginPage);
    }
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
   private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
