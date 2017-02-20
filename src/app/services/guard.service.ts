import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from './../../pages/account/login.page';

export class AuthGuard{
  
  constructor(private navCtrl:NavController){}

  canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
         this.navCtrl.setRoot(LoginPage);
        return false;
    }

}

