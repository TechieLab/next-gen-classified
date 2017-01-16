
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';

import {LoginComponent} from './login.component';
import {AuthService} from '../../services/auth.service';

@NgModule({
    imports: [FormsModule],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [AuthService],
})

export class AccountModule { }