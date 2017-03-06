import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import {Events , NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//import { AccountService } from '../../app/services/account.service';
import { Router } from '@angular/router';

import { HomePage } from '../home/home.page';
import { RegisterPage } from '../account/register.page';
import { AccountService, IAccountService } from './account.service';
import { UserService, IUserService } from '../../app/services/user.service';
import { StorageService } from '../../app/services/storage.service';
import { Login } from '../../app/models/login';
import { User } from '../../app/models/user';

@Component({
    selector: 'login-page',
    providers: [AccountService, UserService, StorageService],
    templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
    public isLogged: boolean = false;
    public signInForm = this.builder.group({
        UserName: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
            , Validators.pattern('[a-zA-Z]*')])
        ],
        Password: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])
        ]
    });

    public errorMsg: string;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public builder: FormBuilder,
        public toastCtrl: ToastController,
        public events: Events,
        @Inject(AccountService) public accountService: IAccountService, @Inject(UserService) public userService: IUserService
    ) {

        this.errorMsg = '';
    }

    ngOnInit() {
        StorageService.removeToken();
        StorageService.removeContext();
    }

    onSubmitForm() {
        this.accountService.login(this.signInForm.value).subscribe((result) => {
            if (result.Success) {
                StorageService.setToken(result.Content);
                this.navCtrl.setRoot(HomePage);
                this.events.publish('user:login');
            } else {
               this.presentToast(result.Message);
            }
        });
    }

    gotoDashboardPage() {
        this.navCtrl.setRoot(HomePage, { category: 'Dashboard' });
    }

    userRegistration() {
        this.navCtrl.push(RegisterPage);
    }

    logOut() {
        this.accountService.logout();
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}