
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {ProductComponent} from './product.component';

@NgModule({
    imports: [FormsModule],
    declarations: [ProductComponent],
    exports: [ProductComponent],
    providers: [],
})

export class ProductModule { }