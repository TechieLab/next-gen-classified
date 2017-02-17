import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//import { AccountService } from '../../app/services/account.service';
import { Router } from '@angular/router';

import { HomePage } from '../home/home.page';
import { RegisterPage } from '../account/register.page';

import { Login } from '../../app/models/login';
import { User } from '../../app/models/user';

@Component({
    selector: 'login-page',
    providers: [],
    templateUrl: 'login.html'
})

export class LoginPage {

    public LoginForm = this.builder.group({
        Username: [""],
        Password: [""]
    });

    public errorMsg = '';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public builder: FormBuilder
       // public accountService: AccountService
        ) {

    }

    login() {
     /*   this.accountService.register(this.LoginForm.value).subscribe((result) => {
            if (result.Success) {
                debugger;
            }
        }); */
    }

    logout() {

    }

    isLoggedIn() {

    }

    gotoDashboardPage() {
        this.navCtrl.setRoot(HomePage, { category: 'Dashboard' });
    }

    userRegistration() {
       this.navCtrl.push(RegisterPage);
    }
}