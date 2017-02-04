import {Component, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Router} from '@angular/router';
import {RegisterPage} from './register.page';

import {HomePage} from '../home/home.page';

import {ILoginModel} from '../../app/models/login';
import {IUser} from '../../app/models/user';

@Component({
    selector: 'login-page',
    providers: [],
    templateUrl: 'login.html'
})

export class LoginPage{

   
    public errorMsg = '';

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      
    }

    login() {
        
    }

    logout() {
       
    }

    isLoggedIn() {
      
    }

     gotoDashboardPage(){
          this.navCtrl.setRoot(HomePage, { category : 'Dashboard' });
    }

    userRegistration(){
        this.navCtrl.push(RegisterPage);
    }
}