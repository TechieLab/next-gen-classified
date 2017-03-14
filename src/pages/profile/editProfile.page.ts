import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../app/models/profile';
import { ProfilePage } from './profile.page';
import { ProfileService, IProfileService } from './profile.service';

@Component({
  selector: 'edit-profile-page',
  templateUrl: 'editProfile.html',
  providers: [ProfileService]
})

export class EditProfilePage implements OnInit {
  selectedItem: any;
  editMode: boolean = false;
  profile: Profile;
  profileService: IProfileService;

  public editProfileForm = this.builder.group({
    FullName: ["", Validators.required],
    EmailId: ["", Validators.required],
    SkypeId: ["", Validators.required],
    PhoneNumber: ["", Validators.required]
  });

  constructor(public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
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

  onSubmitForm() {
    var data = this.editProfileForm.value;

    if (data) {
      this.profile.FullName = data.FullName;
      this.profile.Contact.EmailId = data.EmailId;
      this.profile.Contact.PhoneNumber = data.PhoneNumber;
    }


    this.profileService.put(this.profile).subscribe((result) => {
      if (result) {      
        this.navCtrl.push(ProfilePage);
      }
    });
  }
}
