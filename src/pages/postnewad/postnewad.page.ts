import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NavController, NavParams } from 'ionic-angular';
import { ILookupService, LookupService } from '../../app/services/lookup.service';
import { Lookup } from '../../app/models/lookup';
import { Post } from '../../app/models/post';
import { IPostService, PostService } from '../../app/services/post.service';

import { MyPostingsPage } from '../myPostings/myPostings.page';

@Component({
  selector: 'post-ad',
  templateUrl: 'postnewad.html',
  entryComponents: [],
  providers: [PostService]
})

export class PostNewAdPage implements OnInit {

  private selectedCategory: string;
  private categories: Array<Lookup>;
  private defects: Array<Lookup>;
  private brands: Array<Lookup>;

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

    this.selectedCategory = navParams.get('category');
  }

  ngOnInit() {
    this.getCategoryData();
    this.getBrandsData();
    this.getDefectsData();
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
        this.navCtrl.setRoot(MyPostingsPage);
      }
    });
  }

  resetForm() {
    this.newPostForm.value = new Post();
  }

}