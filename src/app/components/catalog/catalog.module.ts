
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {CatelogComponent} from './catalog.component';

@NgModule({
    imports: [FormsModule],
    declarations: [CatelogComponent],
    exports: [CatelogComponent],
    providers: [],
})

export class CatalogModule { }