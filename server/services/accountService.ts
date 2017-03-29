
import { Result } from '../models/result';
import { UserInfo } from '../models/userInfo';
import { User } from '../models/user';
import {ChangePassword} from '../models/account';
import { IMailService, MailService } from './mail.service';
import { IBaseService, BaseService } from '../services/baseService';
import { IUserRepository } from '../repository/userRepository';
import logger = require('winston');
import { Login, Register } from '../models/account';
import { Session } from '../models/session';

var jwt = require('jsonwebtoken');

export interface IAccountService {
    register(data: User, callback: (item: Result) => any);
    verify(token: string, callback: (item: Result) => any);
    getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any);
    changePassword(id: string, data: any, callback: (item: Result) => any);
    forgotPassword(id: string, callback: (errr: Error, item: Result) => any);
    authenticate(login: Login, callback: (item: Result) => any);
    logout(id: string, callback: (item: Result) => any);
}
export class AccountService implements IAccountService {
    public mailService: IMailService;

    public constructor(public repository: IUserRepository) {

        this.mailService = new MailService();
    }

    public register(data: User, callback: (item: Result) => any) {       
        data.Token = this.generateToken().token;
        data.TokenValidity = this.generateToken().expries;
        
        this.repository.create(data, (err, item) => {
            var result = new Result();

            if (!err) {
                result.Message = "Account Created Succesfully";
                result.Success = true;

                var url = "http://192.168.0.102:3000/account/verify/" + data.Token;

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
        this.repository.get({ "Token": token }, (err, user:any) => {
            if (err) throw err;

            var result = new Result();
            var option = {};
            if (user && user.length) {
                if (user[0].Token && user[0].Token == token) {
                    if (new Date(user[0].TokenValidity).getHours() == new Date().getHours()) {
                        result.Message = "Token Expired";
                        result.Success = true;
                    } else {
                        var tempUser = user[0];
                        tempUser.Status = 'active';

                        this.repository.update(tempUser._id.toString(), tempUser, option,(error, res) => {
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
    public changePassword(id: string, data: ChangePassword, callback: (item: Result) => any) { 
        console.log('testdaata',data);
        this.repository.get({Password: data.CurrentPassword}, (err, user) => {
            if (err) throw err;

            var result = new Result();
            var option = {};
            if (user && user.length) { 
                var currentUser = user[0];
                 currentUser.Password = data.NewPassword;
                 console.log('current user',currentUser);
                 this.repository.update(currentUser._id.toString(),currentUser, option,(err,res)=>{
                     if(err) throw err;
 
                    result.Message = "Password Changed Succesfully";
                    result.Content ={ UserName: currentUser.UserName}
                    result.Success = true;

                    callback(result);

                 })        
            } else {
                result.Message = "Sorry your current password is wrong";
                result.Success = false;

                callback(result);
            }
        });
    }
    public forgotPassword(id: string, callback: (errr: Error, item: Result) => any) { }

    public authenticate(login: Login, callback: (item: Result) => any) {

         console.log('login repository outside.................');
        this.repository.get({ UserName: login.UserName }, (err, users) => {
            if (err) throw err;

            console.log('login repository',users);
            var result = new Result();
            var option= {};
            if (users && users.length) {
                var currentUser = users[0];
                if (currentUser.Password == login.Password) {
                    if (!currentUser.Session) {
                        currentUser.Session = new Session();
                    }
                    currentUser.Session.AuthToken = this.generateAuthToken(currentUser);
                    this.repository.update(currentUser._id.toString(), currentUser,option,function (err, res) {
                        if (err) throw err;

                        result.Message = "Authenticated Succesfully";
                        result.Content = { UserName: currentUser.UserName, Token: currentUser.Session.AuthToken,ClientId: currentUser._id,EmailId:currentUser.EmailId }
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
        });
    }

    public logout(id: string, callback: (item: Result) => any) {
        
        this.repository.getById(id, (err, user) => {
            if (err) throw err;

            var result = new Result();
            var option= {};
            if (user) { 
                user.Session.AuthToken = null;
                this.repository.update(user._id.toString(), user, option,function (err, res) {
                    if (err) throw err;

                    result.Message = "Logged off Succesfully";
                    result.Content = null
                    result.Success = true;

                    callback(result);
                });               
            } else {
                result.Message = "User not found.";
                result.Success = false;

                callback(result);
            }
        });
    }

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
