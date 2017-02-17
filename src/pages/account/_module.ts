import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import {LoginPage} from './login.page';
import {RegisterPage} from './register.page';
import {ConfirmationPage} from './confirmation.page';

import { AccountService, IAccountService } from '../../app/services/account.service';
import { UserService, IUserService } from '../../app/services/user.service';


@NgModule({
    declarations:[LoginPage,RegisterPage,ConfirmationPage],    
    exports:[LoginPage],
    entryComponents:[RegisterPage,ConfirmationPage],
    imports:[IonicModule, FormsModule],
    providers:[UserService,AccountService]
})

export class AccountModule{}