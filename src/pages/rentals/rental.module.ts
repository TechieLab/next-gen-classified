import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RentalService} from './rental.service';
import {RentalPage} from './rental.page';

@NgModule({
    declarations:[RentalPage],    
    exports:[RentalPage],
    imports:[IonicModule, FormsModule, ReactiveFormsModule],
    providers:[RentalService],
    entryComponents: [RentalPage]
})

export class RentalModule{}