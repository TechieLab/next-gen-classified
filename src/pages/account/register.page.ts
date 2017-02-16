import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService, IAccountService } from '../../app/services/account.service';
import { SignUp } from '../../app/models/login';
import { User } from '../../app/models/user';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html',
    providers: [AccountService]
})

export class RegisterPage {

    private errorMsg = '';
    private isAccountCreated: boolean;

    public SignUpForm = this.builder.group({
        Username: [""],
        Password: [""],
        ConfirmPassword: [""],
        Email: [""]
    });

    constructor(public builder: FormBuilder,@Inject(AccountService)  public accountService: IAccountService) {
    }   

    onSubmitForm() {
        this.accountService.register(this.SignUpForm.value).subscribe((result) => {
            if (result.Success) {
                this.isAccountCreated = true;
            }
        });
    } 

    resetForm() {
        this.SignUpForm.value = new SignUp();
    }
}