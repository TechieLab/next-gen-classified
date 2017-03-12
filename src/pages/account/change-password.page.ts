import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AccountService, IAccountService } from './account.service';

@Component({
  selector: 'changepassword-page',
  templateUrl: 'change-password.html',
  providers: [AccountService]
})

export class ChangePasswordPage  {
  selectedItem: any;
  editMode: boolean = false;
  user: User;
  INVALID_INVALID_PASSWORD:Boolean = false;

   public changePasswordForm = this.builder.group({
        CurrentPassword:['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])],
        NewPassword:['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])],
        ConfPassword:['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])]
    });
  
  constructor(public builder: FormBuilder, public navCtrl: NavController, public navParams: NavParams,
    @Inject(AccountService) public accountService: IAccountService) {
    
      this.user = new User();
  }


  onSubmitForm() {
    
   var data = this.changePasswordForm.value;
   if (data) {
     var newpassword = this.changePasswordForm.value.NewPassword;
     var confirmpassword = this.changePasswordForm.value.ConfPassword;
     this.user.Password = data.CurrentPassword;
  
     if(newpassword ===  confirmpassword){
         this.accountService.changePassword(this.user).subscribe((results) =>{
            if(results.success){
                 debugger;
            }
         })  
     }else{
       this.INVALID_INVALID_PASSWORD = true;
     }
   }
  }
}
