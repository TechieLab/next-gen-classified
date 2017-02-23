import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {FiltersPage}   from '../filters/filters.page';
import {CatalogPage} from '../catalog/catalog.page';
import {SearchPage} from '../search/search.page';
import { VendorService } from '../../app/services/vendor.service';


@NgModule({
    declarations:[SearchPage],    
    exports:[SearchPage],
    imports:[IonicModule, FormsModule],
    providers:[VendorService],
    entryComponents: [FiltersPage]
})

export class SearchModule{}