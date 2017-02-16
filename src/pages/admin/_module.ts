import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {AdminPage} from './admin.page';

@NgModule({
    declarations:[AdminPage],
    exports:[AdminPage],
    imports:[IonicModule],
    providers:[]
})

export class AdminModule{}