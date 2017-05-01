import { Component, Inject , 
  NavController, NavParams, ToastController, ModalController , 
  NgForm, FormBuilder, FormControl, FormGroup, Validators } from '../common/index';

import { StorageService } from '../../app/services/storage.service';
import { Offer } from '../../app/models/offer';
import { IOfferService, OfferService } from './offer.service';
import { HomePage , ChatPage, ChatWindow } from '../index';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public builder: FormBuilder,
    public modalCtrl: ModalController,
    @Inject(OfferService) public offerService: IOfferService, public toastCtrl: ToastController) {
    this.offer = new Offer();
    this.listingPrice = navParams.get('price');
    this.offer.PostId = navParams.get('_id');
    this.offer.UserId = navParams.get('userId');
  }

  onSubmitForm() {
    this.offerService.post(this.offer).subscribe((result) => {
      if (result) {
        this.presentToast('Great! you just made an offer.please wait for seller reply');
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  openChat() {
    let modal = this.modalCtrl.create(ChatWindow, { receiverId: this.offer.UserId });
    modal.onDidDismiss(data => {

    });
    modal.present();
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
