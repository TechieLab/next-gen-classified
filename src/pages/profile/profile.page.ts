import { Component, Inject, OnInit } from '@angular/core';
import { Headers } from '@angular/http';

import { Events, NavController, NavParams, Platform, ToastController, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import {Constants} from '../../app/common/constants';
import { Profile } from '../../app/models/profile';
import { Media } from '../../app/models/media';
import { EditProfilePage } from './editProfile.page';
import { ChangePasswordPage } from '../account/change-password.page'
import { ProfileService, IProfileService } from './profile.service';
import { StorageService } from '../../app/services/storage.service';
import { IUploadService, UploadService } from '../../app/services/upload.service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  entryComponents: [ChangePasswordPage],
  providers: [ProfileService]
})

export class ProfilePage implements OnInit {
  selectedItem: any;
  editMode: boolean = false;
  profile: Profile;
  profileService: IProfileService;
  uploadService: IUploadService;
  loading: Loading;
  lastImage: string;
  isopen: Boolean = false;
  imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;
  filename: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, public events: Events,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    @Inject(ProfileService) profileService: IProfileService,
    @Inject(UploadService) uploadService: IUploadService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.profileService = profileService;
    this.uploadService = uploadService;

    this.profile = new Profile();
  }

  ngOnInit() {
    this.getProfile();

    this.events.subscribe('photo-uploaded', () => {
      this.getProfile();
    });

    this.events.subscribe('photo-removed', () => {
      this.removePhoto();
    });
  }

  editProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  changePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }

  changePhoto() {
    var url = Constants.ProfileApi + 'upload';
    this.uploadService.openActionSheet(url);
  }

  removePhoto() {
    this.profile.Media = new Media();
    this.profileService.put(this.profile._id, this.profile).subscribe((res) => {
      this.presentToast('Photo removed succesfully');
    });
  }

  getProfile() {
    this.profileService.getById(null).subscribe((result) => {
      if (result) {
        this.profile = result;
      }
    });
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
