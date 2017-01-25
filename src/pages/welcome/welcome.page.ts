import {Component, OnInit, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {DashboardPage} from '../dashboard/dashboard.page';
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
          this.navCtrl.push(DashboardPage, { category : 'Dashboard' });
    }

   gotoLoginPage(){
          this.navCtrl.push(SignInPage, { category : 'SignIn' });
    } 
}