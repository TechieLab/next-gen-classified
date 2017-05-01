import {
    NgModule, ErrorHandler, IonicApp,
    IonicModule, IonicErrorHandler, FormsModule,
    ReactiveFormsModule
} from '../common/index';

import { CatalogPage, OfferPage } from '../index';

@NgModule({
    declarations: [CatalogPage],
    exports: [CatalogPage],
    imports: [IonicModule, FormsModule, ReactiveFormsModule],
    providers: [],
    entryComponents: [CatalogPage, OfferPage]
})

export class CatalogModule { }