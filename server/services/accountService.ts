
import { Result } from '../models/result';
import { UserInfo } from '../models/userInfo';
import { User } from '../models/user';
import { IMailService, MailService } from './mail.service';

import { IUserRepository } from '../repository/userRepository';
import logger = require('winston');
import { Login, Register } from '../models/account';


export interface IAccountService {
    register(data: Register, callback: (item: Result) => any);
    verify(token: string, callback: (item: Result) => any);
    getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any);
    changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any);
    forgotPassword(id: string, callback: (errr: Error, item: Result) => any);
    authenticate(login: Login, callback: (errr: Error, item: Result) => any);
    logout(id: string, callback: (errr: Error, item: Result) => any);
}
export class AccountService implements IAccountService {
    public mailService: IMailService;

    public constructor(public repository: IUserRepository) {
        this.mailService = new MailService();
    }

    public register(data: Register, callback: (item: Result) => any) {
        var user = new User();
        user.UserName = data.UserName;
        user.Passward = data.Password;
        user.EmailId = data.EmailId;
        user.Token = this.generateToken();

        this.repository.create(user, (err, item) => {
            var result = new Result();

            if (!err) {
                result.Message = "Account Created Succesfully";
                result.Success = true;

                var url = "http://localhost:3000/account/verify/" + user.Token.value;

                var message = "Thank you for create an account on classifed.realpage.com. Your Username is " + item.UserName + "<br />";
                message += "You may now activate you account by clicking this link or copying and pasting it into your browser <br />";
                message += "<a href='" + url + "'>Activate Account</a>";

                this.mailService.send(item.EmailId, message);

            } else {
                result.Success = false;
            }

            callback(result);
        });
    }

    verify(token: string, callback: (item: Result) => any) {
        this.repository.get({ token: { value: token }}, (err, user) => {
            var result = new Result();

            if (user) {
                if (user[0].Token && user[0].Token.value == token) {
                    if (new Date(user[0].Token.expires).getHours() == new Date().getHours()) {
                        result.Message = "Token Expired";
                        result.Success = true;
                    } else {
                        result.Message = "Account Verified Succesfully";
                        result.Success = true;
                    }
                } else {
                    result.Message = "Unable to verify account";
                    result.Success = false;
                }
            } else {
                result.Message = "User doesnot exists";
                result.Success = false;
            }
            callback(result);
        });
    }

    public getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any) { }
    public changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any) { }
    public forgotPassword(id: string, callback: (errr: Error, item: Result) => any) { }
    public authenticate(login: Login, callback: (errr: Error, item: Result) => any) { }
    public logout(id: string, callback: (errr: Error, item: Result) => any) { }

    private generateToken(): any {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var token = '';
        for (var i = 16; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
        }

        // create expiration date
        var expires = new Date();
        expires.setHours(expires.getHours() + 24);

        return {
            value: token,
            expires: expires
        };
    }
}
