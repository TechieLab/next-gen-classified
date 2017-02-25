import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../app/models/profile';
import { EditProfilePage } from './edit-profile';
import { ProfileService, IProfileService } from '../../app/services/profile.service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})

export class ProfilePage implements OnInit {
  selectedItem: any;
  editMode: boolean = false;
  profile: Profile;
  profileService: IProfileService;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject(ProfileService) profileService: IProfileService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.profileService = profileService;

    this.profile = new Profile();
  }

  ngOnInit() {
    this.getProfileProfile();
  }  

  editProfile() {
    this.navCtrl.push(EditProfilePage);
  }

  getProfileProfile() {
    this.profileService.getById(null).subscribe((result) => {
      if (result) {
        this.profile = result;
      }
    });
  }
}
