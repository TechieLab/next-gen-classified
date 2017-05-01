
import {
    Component, FormBuilder, Inject, OnInit, Validators, FormControl,
    NavController, NavParams, ToastController, Events
} from '../common/index';

import { ConfirmationPage } from './index';
import { AccountService, IAccountService} from './account.service';
import { UserService, IUserService } from '../../app/services/index';
import { SignUp, User } from '../../app/models/index';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html',

    providers: [AccountService, UserService]
})

export class RegisterPage {

    private errorMsg = '';
    private isAccountCreated: boolean;
    private INVALID_USER_NAME: boolean = false;

    public signUpForm = this.builder.group({
        UserName: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
            , Validators.pattern('[a-zA-Z]*')])
            , this.checkUsername.bind(this)
        ],
        Password: ['', Validators.compose([Validators.minLength(6)
            , Validators.required
        ])],
        FullName: [""],
        EmailId: [""],
        ConfirmPassword: [""]
    });

    constructor(public navCtrl: NavController,
        public builder: FormBuilder,
        @Inject(AccountService) public accountService: IAccountService,
        @Inject(UserService) public userService: IUserService) {
    }


    checkUsername(control: FormControl): any {
        this.INVALID_USER_NAME = false;

        return new Promise(resolve => {
            this.userService.getByUserName(control.value).subscribe(
                data => {
                    if (typeof data[0] !== "undefined") {
                        if (data.length) {
                            this.INVALID_USER_NAME = true;
                        } else {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                },
                err => { console.log('Error:'); console.log(err); }
            )
        });
    }

    onSubmitForm() {
        this.accountService.register(this.signUpForm.value).subscribe((result) => {
            if (result.Success) {
                this.isAccountCreated = true;
                this.navCtrl.setRoot(ConfirmationPage);
            }
        });
    }

    resetForm() {
        this.signUpForm.value = new SignUp();
    }
}