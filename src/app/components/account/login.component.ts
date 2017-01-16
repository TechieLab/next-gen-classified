import {Component, ElementRef} from '@angular/core';
import {AccountService} from './accountService'
import {Router} from '@angular/router';

import {LoginModel} from '../../models/login';
import {IUser} from '../../models/user';

//Auth Service
import { AuthService } from '../../services/auth.service';
//import './account.scss';

@Component({
    selector: 'login-form',
    providers: [AuthService],
    template: require('./login.html')
})

export class LoginComponent {

    public loginModel: LoginModel;
    public currentUser: IUser;

    public errorMsg = '';

    constructor(private router: Router, private authService: AuthService) {
        this.loginModel = new LoginModel();
    }

    login() {
        this.authService.authenticate(this.loginModel).subscribe((response) => {
            if (response && response.success) {
                localStorage.setItem('user-context', JSON.stringify(response.content));
                localStorage.setItem('auth_token', "sdffasfdasfd435353asdfasdf");
                this.authService.emitAuthChangeEvent();
                this.router.navigate(['home']);
            } else {
                this.errorMsg = response.message;
            }            
        });        
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.router.navigate(['login']);
    }

    isLoggedIn() {
        return !!localStorage.getItem('auth_token');
    }
}