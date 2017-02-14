import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ILoginService, LoginService } from '../../app/services/login.service';
import {SignUp} from '../../app/models/login';
import {User} from '../../app/models/user';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html',
    providers: [LoginService]
})

export class RegisterPage{
 
     public errorMsg = '';
     public SignUpForm = this.builder.group({
        Username: [""],
        Password: [""],
        ConfirmPassword: [""],
        Email: [""]
  });

  constructor(public builder: FormBuilder, @Inject(LoginService) public LoginService: ILoginService){
   
  }

    login() {
        
    }

    logout() {
       
    }

    onSubmitForm() {
        this.LoginService.post(this.SignUpForm.value).subscribe((result) => {
        if (result.Success) {
           debugger;
        }
        });
   }

    isLoggedIn() {
      
    }
    
    resetForm() {
       this.SignUpForm.value = new SignUp();
    }
}