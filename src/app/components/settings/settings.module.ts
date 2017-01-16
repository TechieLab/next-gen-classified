
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {SettingsComponent} from './settings.component';

@NgModule({
    imports: [FormsModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
    providers: [],
})

export class ProductModule { }