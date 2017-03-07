import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CanActivate } from '@angular/router';
import { LoginPage } from './../../pages/account/login.page';

export interface IAuthGuard  {
    canActivate();
}

@Injectable()
export class AuthGuard implements IAuthGuard {

    constructor() { }

    canActivate() {
        if (localStorage.getItem('Auth_Token')) {
            // logged in so return true
            return true;
        } else {
            return false
        }
    }  
}

