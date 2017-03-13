import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Events , NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home.page';
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
  isAccountPasswordChnaged:Boolean = false;

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
    @Inject(AccountService) public accountService: IAccountService,
     public toastCtrl: ToastController,
     public events: Events
    ) {
    
      this.user = new User();
  }


  onSubmitForm() {
    
   var data = this.changePasswordForm.value;
   if (data) {
     var newpassword = this.changePasswordForm.value.NewPassword;
     var confirmpassword = this.changePasswordForm.value.ConfPassword;
     this.user.Password = data.CurrentPassword;
  
     if(newpassword ===  confirmpassword){
         this.accountService.changePassword(this.changePasswordForm.value).subscribe((results) =>{
            if(results.Success){
                this.events.publish('user:changePassword');
                this.navCtrl.setRoot(HomePage);
            }
         })  
     }else{
       this.INVALID_INVALID_PASSWORD = true;
     }
   }
  }
}
