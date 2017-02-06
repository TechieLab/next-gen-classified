import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ILookupService, LookupService } from '../../app/services/lookup.service';
import { ILookup } from '../../app/models/lookup';
import { IPost } from '../../app/models/post';
import { IPostService, PostService } from '../../app/services/post.service';

import { MyPostingsPage } from '../myPostings/myPostings.page';

@Component({
  selector: 'post-ad',
  templateUrl: 'postnewad.html',
  entryComponents: [],
  providers: [PostService]
})

export class PostNewAd implements OnInit {

  private selectedCategory: string;
  private newPostForm: IPost;
  private categories: Array<ILookup>

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(LookupService) public lookupService: ILookupService,
    @Inject(PostService) public postService: IPostService) {
    this.selectedCategory = navParams.get('category');
    this.newPostForm = <IPost>{};
  }

  logForm() {

  }

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData() {
    this.lookupService.getCategories().subscribe((response) => {
      this.categories = response
    });
  }

  onSubmitForm() {
    this.postService.post(this.newPostForm).subscribe((result) => {
      if (result.Success) {
        this.navCtrl.setRoot(MyPostingsPage);
      }
    });
  }

  resetForm() {
    this.newPostForm = <IPost>{};
  }

}