import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AccountService, IAccountService } from '../../app/services/account.service';
import { UserService, IUserService } from '../../app/services/user.service';
import { SignUp } from '../../app/models/login';
import { User } from '../../app/models/user';
import {ConfirmationPage} from './confirmation.page';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html',
    providers: [AccountService, UserService]
})

export class RegisterPage {

    private errorMsg = '';
    private isAccountCreated: boolean;

    public signUpForm = this.builder.group({
        UserName: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
            , Validators.pattern('[a-zA-Z]*')])
            , this.checkUsername.bind(this)
        ],
        Password: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])],
        EmailId : [""],
        ConfirmPassword : [""]
    });

    constructor(public navCtrl: NavController, public builder: FormBuilder, @Inject(AccountService) public accountService: IAccountService,@Inject(UserService) public userService: IUserService) {
    }


    checkUsername(control: FormControl): any {
        return new Promise(resolve => {
            this.userService.getByUserName(control.value).subscribe(
                data => {
                    if (typeof data[0] !== "undefined") {
                        if (typeof data[0].login === "undefined") {
                            resolve(null);
                        } else {
                            resolve({ "INVALID_USER_NAME": true });
                        }
                    } else {
                        resolve(null);
                    }
                },
                err => { console.log('Erroe:'); console.log(err); }
            )
        });
    }

    onSubmitForm() {
         this.accountService.register(this.signUpForm.value).subscribe((result) => {
              if (result.Success) {
                  this.isAccountCreated = true;
                  this.navCtrl.setRoot(ConfirmationPage);
              }
          });
    }

    resetForm() {
        this.signUpForm.value = new SignUp();
    }
}