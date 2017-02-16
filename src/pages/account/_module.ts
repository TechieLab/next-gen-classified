import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import {LoginPage} from './login.page';
import {RegisterPage} from './register.page';

@NgModule({
    declarations:[LoginPage,RegisterPage],
    exports:[LoginPage,RegisterPage],
    imports:[IonicModule],
    providers:[]
})

export class AccountModule{}