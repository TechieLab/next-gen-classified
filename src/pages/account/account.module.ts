import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import {ChangePasswordPage} from './change-password.page';
import {LoginPage} from './login.page';
import {RegisterPage} from './register.page';
import {ConfirmationPage} from './confirmation.page';

import { AccountService, IAccountService } from './account.service';
import { UserService, IUserService } from '../../app/services/user.service';


@NgModule({
    declarations:[LoginPage,RegisterPage,ConfirmationPage,ChangePasswordPage],    
    exports:[LoginPage,ChangePasswordPage],
    entryComponents:[RegisterPage,ConfirmationPage,ChangePasswordPage],
    imports:[IonicModule, FormsModule],
    providers:[UserService,AccountService]
})

export class AccountModule{}