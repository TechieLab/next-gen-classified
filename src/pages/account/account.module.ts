import {
    NgModule, ErrorHandler,
    IonicApp, IonicModule, IonicErrorHandler, FormsModule
} from '../common/index';
import {
    ChangePasswordPage, LoginPage, RegisterPage, ConfirmationPage
} from './index';
import {
    AccountService, IAccountService
} from './account.service';
import { UserService, IUserService } from '../../app/services/index';


@NgModule({
    declarations: [LoginPage, RegisterPage, ConfirmationPage, ChangePasswordPage],
    exports: [LoginPage, ChangePasswordPage],
    entryComponents: [RegisterPage, ConfirmationPage, ChangePasswordPage],
    imports: [IonicModule, FormsModule],
    providers: [UserService, AccountService]
})

export class AccountModule { }