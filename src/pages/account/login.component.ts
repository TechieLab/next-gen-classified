import {Component, ElementRef} from '@angular/core';
import {Router} from '@angular/router';

import {LoginModel} from '../../models/login';
import {IUser} from '../../models/user';

@Component({
    selector: 'login-form',
    providers: [],
    template: require('./login.html')
})

export class LoginComponent {

   
    public errorMsg = '';

    constructor() {
      
    }

    login() {
        
    }

    logout() {
       
    }

    isLoggedIn() {
      
    }
}