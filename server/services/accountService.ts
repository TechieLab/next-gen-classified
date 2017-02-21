
import { Result } from '../models/result';
import { UserInfo } from '../models/userInfo';
import { User } from '../models/user';
import { IMailService, MailService } from './mail.service';
import { IBaseService, BaseService } from '../services/baseService';
import { IUserRepository } from '../repository/userRepository';
import logger = require('winston');
import { Login, Register } from '../models/account';
import { Session } from '../models/session';

var jwt = require('jsonwebtoken');

export interface IAccountService {
    register(data: Register, callback: (item: Result) => any);
    verify(token: string, callback: (item: Result) => any);
    getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any);
    changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any);
    forgotPassword(id: string, callback: (errr: Error, item: Result) => any);
    authenticate(login: Login, callback: (item: Result) => any);
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
        user.Password = data.Password;
        user.EmailId = data.EmailId;
        user.Token = this.generateToken().token;
        user.TokenValidity = this.generateToken().expries;

        if (user.Profile) {
            user.Profile.FullName = data.FullName;
        }

        this.repository.create(user, (err, item) => {
            var result = new Result();

            if (!err) {
                result.Message = "Account Created Succesfully";
                result.Success = true;

                var url = "http://localhost:3000/account/verify/" + user.Token;

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

    public verify(token: string, callback: (item: Result) => any) {
        this.repository.get({ "Token": token }, (err, user) => {
            if (err) throw err;

            var result = new Result();

            if (user && user.length) {
                if (user[0].Token && user[0].Token == token) {
                    if (new Date(user[0].TokenValidity).getHours() == new Date().getHours()) {
                        result.Message = "Token Expired";
                        result.Success = true;
                    } else {
                        var tempUser = user[0];
                        tempUser.Status = 'active';

                        this.repository.update(tempUser._id, tempUser, (error, res) => {
                            if (error) throw err;

                            result.Message = "Account Verified Succesfully";
                            result.Success = true;

                            callback(result);
                        });
                    }
                } else {
                    result.Message = "Unable to verify account";
                    result.Success = false;

                    callback(result);
                }
            } else {
                result.Message = "User doesnot exists";
                result.Success = false;

                callback(result);
            }
        });
    }

    public getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any) { }
    public changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any) { }
    public forgotPassword(id: string, callback: (errr: Error, item: Result) => any) { }

    public authenticate(login: Login, callback: (item: Result) => any) {

        this.repository.get({ UserName: login.UserName }, (err, users) => {
            if (err) throw err;

            var result = new Result();
            if (users && users.length) {
                var currentUser = users[0];
                if (currentUser.Password == login.Password) {
                    if (!currentUser.Session) {
                        currentUser.Session = new Session();
                    }
                    currentUser.Session.AuthToken = this.generateAuthToken(currentUser);
                    this.repository.update(currentUser._id, currentUser, function (err, res) {
                        if (err) throw err;

                        result.Message = "Authenticated Succesfully";
                        result.Content = { Token: currentUser.Session.AuthToken }
                        result.Success = true;

                        callback(result);
                    });
                } else {
                    result.Message = "Invalid Password";
                    result.Success = false;

                    callback(result);
                }
            } else {
                result.Message = "Account doesnot Exists";
                result.Success = false;
                
                callback(result);
            }
        })
    }

    public logout(id: string, callback: (errr: Error, item: Result) => any) { }

    private generateToken(): any {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var token = '';

        for (var i = 32; i > 0; --i) {
            token += chars[Math.round(Math.random() * (chars.length - 1))];
        }

        // create expiration date
        var expires = new Date();
        expires.setHours(expires.getHours() + 24);

        return {
            token: token,
            expires: expires
        };
    }

    private generateAuthToken(user: User): any {
        var token = jwt.sign({ userName: user.UserName, FullName: user.Profile.FullName, userId: user._id }, 'classified-application');

        return token;
    }


}
