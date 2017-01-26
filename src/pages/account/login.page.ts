import {Component, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Router} from '@angular/router';
import {RegisterPage} from './register.page';

import {LoginModel} from '../../models/login';
import {IUser} from '../../models/user';

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

    userRegistration(){
        this.navCtrl.push(RegisterPage);
    }
}