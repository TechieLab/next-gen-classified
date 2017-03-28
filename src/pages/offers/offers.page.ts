import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Rating} from '../../app/components/rating';

@Component({
  selector: 'offer-page',
  templateUrl: 'offers.html',
  entryComponents : [Rating]
})
export class OfferPage { 
  private offer : any;
  listingPrice: string;
  public offerForm = this.builder.group({
        Price: [''],
        Email: [''],
        City: [""],
        EmailId: [""],
        Mobile: [""],
        Comments:[""]
    });

  constructor(public navCtrl: NavController, public navParams: NavParams,public builder: FormBuilder) {
      this.offer = {};
       this.listingPrice = navParams.get('price');
  }

  onSubmitForm(){
       
  }
}
