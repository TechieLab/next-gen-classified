import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [],
    declarations: [DashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [DashboardComponent],
    providers: [],
})

export class DashboardModule { }