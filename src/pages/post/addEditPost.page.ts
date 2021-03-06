import { Component, OnInit, ElementRef, Inject ,
  NgForm, FormBuilder, FormControl, FormGroup, Validators ,
   Events, NavController, NavParams, ToastController } from '../common/index';

import { Lookup, Post, Media, Location } from '../../app/models/index';
import { Constants } from '../../app/common/constants';
import { IPostService, PostService } from './post.service';

import {
  ILookupService, LookupService,
  IUploadService, UploadService, ExternalService
} from '../../app/services/index';

import { MyPostingsPage, PostDetailsPage } from '../index';

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
  private postId: string;
  private post: Post;
  private editMode: boolean = false;

  public newPostForm = this.builder.group({
    Title: ["", Validators.required],
    Price: [0, Validators.required],
    Location: [Location, Validators.required],
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
    public events: Events, public toastCtrl: ToastController,
    @Inject(PostService) public postService: IPostService,
    @Inject(ExternalService) public externalService: ExternalService,
    @Inject(UploadService) public uploadService: IUploadService) {

    this.defects = new Array<Lookup>();
    this.brands = new Array<Lookup>();

    this.postId = navParams.get('_id');

    if (this.postId) {
      this.editMode = true;
    }

    this.post = new Post();
  }

  ngOnInit() {
    this.getCategoryData();
    this.getBrandsData();
    this.getDefectsData();

    if (this.editMode) {
      this.getPost();
    } else {
      this.getLocation();
    }

    this.events.subscribe('photo-uploaded', () => {
      this.getPost();
    });

    this.events.subscribe('photo-removed', () => {
      this.removePhoto();
    });
  }

  getPost() {
    this.post = new Post();
    this.postService.getById(this.postId).subscribe((response) => {
      if (response) {
        this.post = response;
      }
    });
  }

  getLocation() {
    this.externalService.getCurrentLocation().then((loc) => {
      this.post.Location = loc;
    });
  }

  uploadPhotos() {
    var url = Constants.PostApi + this.post._id + '/upload';
    this.uploadService.openActionSheet(url);
  }

  removePhoto() {
    this.post.Product.Photos = [];
    this.postService.put(this.post._id, this.post).subscribe((res) => {
      this.presentToast('Photo removed succesfully');
    });
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
    if (this.editMode) {
      this.postService.put(this.post._id, this.post).subscribe((result) => {
        if (result) {
          this.navCtrl.push(PostDetailsPage);
        }
      });

    } else {
      this.postService.post(this.post).subscribe((result) => {
        if (result) {
          this.navCtrl.setRoot(MyPostingsPage);
        }
      });
    }
  }

  resetForm() {
    this.newPostForm.value = new Post();
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}