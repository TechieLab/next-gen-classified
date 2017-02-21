import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from './../../pages/account/login.page';

export interface IAuthGuard{
    canActivate();
}

@Injectable()
export class AuthGuard implements IAuthGuard{
  
  constructor(){}

  canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }else{
            return false
        }
    }

}

