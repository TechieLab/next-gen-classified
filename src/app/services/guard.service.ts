import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

export interface IAuthGuard extends CanActivate {
    canActivate();
    getCurrentUserName();

}

@Injectable()
export class AuthGuard implements IAuthGuard {

    constructor() { }

    canActivate() {
        if (localStorage.getItem('Auth_Token')) {
            // logged in so return true
            return true;
        } else {    
            return false;
        }
    }

    getCurrentUserName() {
        if (localStorage.getItem('User_Name')) {
            return localStorage.getItem('User_Name');
        }
    }
}

