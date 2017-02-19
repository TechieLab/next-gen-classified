import { Component, ElementRef ,OnInit, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

//import { AccountService } from '../../app/services/account.service';
import { Router } from '@angular/router';

import { HomePage } from '../home/home.page';
import { RegisterPage } from '../account/register.page';
import { AccountService, IAccountService } from '../../app/services/account.service';
import { UserService, IUserService } from '../../app/services/user.service';

import { Login } from '../../app/models/login';
import { User } from '../../app/models/user';

@Component({
    selector: 'login-page',
    providers: [AccountService, UserService],
    templateUrl: 'login.html'
})

export class LoginPage implements OnInit {

    public signInForm = this.builder.group({
        UserName: ['', Validators.compose([Validators.minLength(6)
                     , Validators.required
                     , Validators.pattern('[a-zA-Z]*')])
        ],
        Password: ['',Validators.compose([Validators.minLength(6)
                     , Validators.required
                  ])
        ]
    });

    public errorMsg = '';

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public builder: FormBuilder,
         @Inject(AccountService) public accountService: IAccountService,@Inject(UserService) public userService: IUserService
        ) {

    }

    ngOnInit(){

    }

    onSubmitForm() {
          this.accountService.login(this.signInForm.value).subscribe((result) => {
              if (result.Success) {
                 this.navCtrl.setRoot(HomePage);
              }else{
                  this.errorMsg = result.Message;
              }
          });
    }

    gotoDashboardPage() {
        this.navCtrl.setRoot(HomePage, { category: 'Dashboard' });
    }

    userRegistration() {
       this.navCtrl.push(RegisterPage);
    }
}