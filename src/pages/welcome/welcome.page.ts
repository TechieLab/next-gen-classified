import {Component, OnInit, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home.page';
import {SignInPage} from '../login/login.page';


@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome.html',
  providers: []  
})

export class Welcome implements OnInit { 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }  

  ngOnInit(){

  }

  gotoDashboardPage(){
          this.navCtrl.setRoot(HomePage, { category : 'Dashboard' });
    }

   gotoLoginPage(){
          this.navCtrl.setRoot(SignInPage, { category : 'SignIn' });
    } 
}