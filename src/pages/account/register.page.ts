import {Component, ElementRef} from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import {SignUp} from '../../app/models/login';
import {User} from '../../app/models/user';

@Component({
    selector: 'register-page',
    providers: [],
    templateUrl: 'register.html'
})

export class RegisterPage{
 
     public errorMsg = '';
     public SignUpForm = this.builder.group({
        Username: [""],
        Password: [""],
        ConfirmPassword: [""],
        Email: [""]
  });

  constructor(public builder: FormBuilder){
   
  }

    login() {
        
    }

    logout() {
       
    }

    onSubmitForm() {
           console.log(this.SignUpForm.value);
   }

    isLoggedIn() {
      
    }
    
    resetForm() {
       this.SignUpForm.value = new SignUp();
    }
}