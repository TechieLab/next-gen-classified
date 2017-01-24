import {Component, OnInit, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  providers: []  
})

export class SignInPage implements OnInit { 
  private selectedCategory: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.selectedCategory = navParams.get('category'); 
  }  

  ngOnInit(){

  }
}
