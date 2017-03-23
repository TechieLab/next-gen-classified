import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import { ILookupService, LookupService } from '../../app/services/lookup.service';
import { Lookup } from '../../app/models/lookup';
import { Post } from '../../app/models/post';
import { Media } from '../../app/models/media';
import { IPostService, PostService } from './post.service';

import { MyPostingsPage } from '../myPostings/myPostings.page';
import {PostDetailsPage} from './postDetails.page';

@Component({
  selector: 'post-ad',
  templateUrl: 'addEditPost.html',
  entryComponents: [],
  providers: [PostService]
})

export class AddEditPostPage implements OnInit {

  private selectedCategory: string;
  private categories: Array<Lookup>;
  private defects: Array<Lookup>;
  private brands: Array<Lookup>;
  private postId : string;
  private post : Post;
  private editMode : boolean = false;

  public newPostForm = this.builder.group({
    Title: ["", Validators.required],
    Price: ["", Validators.required],
    Location: ["", Validators.required],
    Description: ["", Validators.required],
    Category: ["", Validators.required],
    Brand: [""],
    Model: [""],
    PurchasedOn: [""],
    Defects: [""],
    Condition: [""]
  });

  constructor(public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
    @Inject(LookupService) public lookupService: ILookupService,
    @Inject(PostService) public postService: IPostService) {

    this.defects = new Array<Lookup>();
    this.brands = new Array<Lookup>();

    this.postId = navParams.get('_id');

    if(this.postId){
      this.editMode = true;
    }

    this.post = new Post();
  }

  ngOnInit() {
    this.getCategoryData();
    this.getBrandsData();
    this.getDefectsData();

    if(this.editMode){
      this.getPost();
    }
  }

  getCategoryData() {
    this.lookupService.getCategories().subscribe((response) => {
      if (response) {
        this.categories = response
      }
    });
  }

  getDefectsData() {
    this.lookupService.getDefects().subscribe((response) => {
      if (response) {
        this.defects = response;
      }
    });
  }

  getBrandsData() {
    this.lookupService.getBrands().subscribe((response) => {
      if (response) {
        this.brands = response;
      }
    });
  }

  onSubmitForm() {
    this.postService.post(this.newPostForm.value).subscribe((result) => {
      if (result.Success) {
        if(this.editMode){
           this.navCtrl.push(PostDetailsPage);  
        }else{
           this.navCtrl.setRoot(MyPostingsPage);
        }
      }
    });
  }

  resetForm() {
    this.newPostForm.value = new Post();
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
      }
    });
  }
}