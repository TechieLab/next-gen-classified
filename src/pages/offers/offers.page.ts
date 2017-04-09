import { Component, Inject } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../app/services/storage.service';
import { Offer } from '../../app/models/offer';
import { IOfferService, OfferService } from './offer.service';
import { HomePage } from '../../pages/home/home.page';


@Component({
  selector: 'offer-page',
  templateUrl: 'offers.html',
  entryComponents: []
})
export class OfferPage {
  listingPrice: string;
  offer: Offer;
  EmailId: string;
  public offerForm = this.builder.group({
    Price: [''],
    Comments: [""]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder,
    @Inject(OfferService) public offerService: IOfferService, public toastCtrl: ToastController) {
    this.offer = new Offer();
    this.listingPrice = navParams.get('price');
    this.offer.PostId = navParams.get('_id');

  }

  onSubmitForm() {
    this.offerService.post(this.offer).subscribe((result) => {
      if (result) {
        this.presentToast('Great! you just made an offer.please wait for seller reply');
        this.navCtrl.setRoot(HomePage);
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
