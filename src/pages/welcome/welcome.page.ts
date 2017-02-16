import {Component, OnInit, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home.page';
import {LoginPage} from '../account/login.page';


@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome.html', 
  entryComponents:[LoginPage],
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
          this.navCtrl.setRoot(LoginPage, { category : 'SignIn' });
    } 
}