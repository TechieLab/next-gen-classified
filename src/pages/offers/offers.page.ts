import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../app/services/storage.service';
import { Offer } from '../../app/models/offer';


@Component({
  selector: 'offer-page',
  templateUrl: 'offers.html',
  entryComponents : []
})
export class OfferPage { 
  listingPrice: string;
  offer:Offer;
  EmailId:string;
  public offerForm = this.builder.group({
        Price: [''],
        Email: [''],
        City: [""],
        EmailId: [""],
        PhoneNumber: [""],
        Comments:[""]
    });

  constructor(public navCtrl: NavController, public navParams: NavParams,public builder: FormBuilder) {
      this.offer = new Offer();
      this.offer.Contact.EmailId = StorageService.getItem('Email_Id');
      this.listingPrice = navParams.get('price');
        
}

  onSubmitForm(){
       
  }
}
