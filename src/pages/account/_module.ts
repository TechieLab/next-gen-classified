import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import {LoginPage} from './login.page';
import {RegisterPage} from './register.page';
import {ConfirmationPage} from './confirmation.Page'

@NgModule({
    declarations:[LoginPage,RegisterPage, ConfirmationPage],    
    entryComponents: [LoginPage,RegisterPage, ConfirmationPage],
    imports:[IonicModule, FormsModule],
    providers:[]
})

export class AccountModule{}