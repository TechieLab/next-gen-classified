import { NgModule , CUSTOM_ELEMENTS_SCHEMA}      from '@angular/core';
import {HomeComponent} from './home.component';

@NgModule({
    imports: [ ],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [HomeComponent],
    providers: [],
})

export class HomeModule { }