import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  @Input() posts: Array<Post>;

  selectedCategory: string;
  subCategories: string[];
  isSubCategorySelected: boolean;
  ads: any[];
  isFavt:boolean = false;
  isUserAuthenticated:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   @Inject(AuthGuard) public authGuard: IAuthGuard,
   @Inject(PostService) public postService: IPostService
   
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.isSubCategorySelected = false;
    this.selectedCategory = navParams.get('category');
    this.subCategories = ["SmartPhone", "Android", "Iphone", "Blackberry"];
    this.posts = new Array<Post>();
    this.viewType = 'list';
  }

  ngOnInit() {
     this.isUserAuthenticated = this.authGuard.canActivate();
  }
  selectSubCategory() {
    this.isSubCategorySelected = true;
  }

  favouritePost(index,post:Post){
     if(this.isUserAuthenticated){
         post.Favt = !post.Favt;
        this.postService.put(post).subscribe((response:any) => {
                this.posts[index] = response;
          });
     }else{
        this.navCtrl.push(LoginPage);
     }
  }

  showProductDetails(itemId: string) {
    this.navCtrl.push(PostDetailsPage, { _id: itemId });
  }
}
