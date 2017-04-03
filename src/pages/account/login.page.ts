import { Component, ElementRef, OnInit, Inject } from '@angular/core';
import {Events, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';

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
    FB_APP_ID: number = 1899760586938292;
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
        Facebook.browserInit(this.FB_APP_ID, "v2.8");
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

    doFacebookLogin() {
        let permissions = new Array();
        //the permissions your facebook app needs from the user
        permissions = ["public_profile"];
        Facebook.login(permissions)
            .then(function (response) {
                let userId = response.authResponse.userID;
                let params = new Array();

                //Getting name and gender properties
                Facebook.api("/me?fields=name,gender", params)
                    .then(function (user) {
                        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                        //now we have the users info, let's save it in the NativeStorage
                        NativeStorage.setItem('user',
                            {
                                name: user.name,
                                gender: user.gender,
                                picture: user.picture
                            })
                            .then(function () {
                                this.navCtrl.push(HomePage);
                            }, function (error) {
                                console.log(error);
                            })
                    })
            }, function (error) {
                console.log(error);
                alert(error);    
        });

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