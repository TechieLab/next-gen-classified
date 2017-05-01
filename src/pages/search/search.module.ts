import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { FiltersPage, CatalogPage, SearchPage } from '../index';
import { CatalogModule } from '../catalog/catalog.module';
import { ExternalService } from '../../app/services/external.service';
import { SearchService } from './search.service';

@NgModule({
    declarations: [SearchPage],
    exports: [SearchPage],
    imports: [IonicModule, FormsModule, ReactiveFormsModule, CatalogModule],
    providers: [ExternalService, SearchService],
    entryComponents: [FiltersPage, CatalogPage]
})

export class SearchModule { }