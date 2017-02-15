import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../app/services/auth.service';
import {SignUp} from '../../app/models/login';
import {User} from '../../app/models/user';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html',
    providers: [AuthService]
})

export class RegisterPage{
 
     public errorMsg = '';
     public SignUpForm = this.builder.group({
        Username: [""],
        Password: [""],
        ConfirmPassword: [""],
        Email: [""]
  });

  constructor(public builder: FormBuilder, public authService: AuthService){
   
  }

    login() {
        
    }

    logout() {
       
    }

    onSubmitForm() {
        this.authService.register(this.SignUpForm.value).subscribe((result) => {
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