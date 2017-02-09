import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Profile} from '../../app/models/profile';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  selectedItem: any;
  editMode : boolean = false;
  profile:Profile;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.profile = new Profile();
  }

  editProfile(){
    this.editMode = true;
  }
}
