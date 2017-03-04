import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams, Platform,ToastController, ActionSheetController, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Profile } from '../../app/models/profile';
import { EditProfilePage } from './editProfile.page';
import { ProfileService, IProfileService } from './profile.service';

declare var cordova: any;

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html',
  providers: [ProfileService]
})

export class ProfilePage implements OnInit {
  selectedItem: any;
  editMode: boolean = false;
  profile: Profile;
  profileService: IProfileService;
  loading: Loading;
  lastImage : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
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

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change Profile Picture',
      buttons: [
        {
          text: 'Capture Photo',
          role: 'capture',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Select From Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Remove Picture',
          handler: () => {

          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}
