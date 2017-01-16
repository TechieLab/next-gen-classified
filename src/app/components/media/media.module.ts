
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {MediaComponent} from './catalog.component';

@NgModule({
    imports: [FormsModule],
    declarations: [MediaComponent],
    exports: [MediaComponent],
    providers: [],
})

export class MediaModule { }