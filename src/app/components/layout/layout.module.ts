import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {RouterModule} from '@angular/router';
import {LayoutComponent} from  './layout.component';


@NgModule({
    imports: [RouterModule],
    declarations: [ LayoutComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [LayoutComponent],
    providers: [],
})

export class LayoutModule { }