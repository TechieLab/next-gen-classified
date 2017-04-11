import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {CatalogPage} from '../catalog/catalog.page';
import { OfferPage } from '../offers/offers.page';

@NgModule({
    declarations:[CatalogPage],    
    exports:[CatalogPage],
    imports:[IonicModule, FormsModule, ReactiveFormsModule],
    providers:[],
    entryComponents: [CatalogPage, OfferPage]
})

export class CatalogModule{}