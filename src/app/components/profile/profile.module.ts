
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {ProfileComponent} from './profile.component';

@NgModule({
    imports: [FormsModule],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    providers: [],
})

export class ProductModule { }