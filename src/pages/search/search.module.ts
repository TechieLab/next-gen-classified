import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {FiltersPage}   from '../filters/filters.page';
import {CatalogPage} from '../catalog/catalog.page';
import {CatalogModule} from '../catalog/catalog.module';
import {SearchPage} from '../search/search.page';
import { ExternalService } from '../../app/services/external.service';
import {SearchService} from './search.service';

@NgModule({
    declarations:[SearchPage],    
    exports:[SearchPage],
    imports:[IonicModule, FormsModule, ReactiveFormsModule, CatalogModule],
    providers:[ExternalService, SearchService],
    entryComponents: [FiltersPage,CatalogPage]
})

export class SearchModule{}