
import { Result } from '../models/result';
import { UserInfo } from '../models/userInfo';
import { User } from '../models/user';

import { IUserRepository } from '../repository/userRepository';
import logger = require('winston');
import { Login, Register } from '../models/account';

export interface IAccountService {
    register(data: Register, callback: (item: Result) => any);
    getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any);
    changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any);
    forgotPassword(id: string, callback: (errr: Error, item: Result) => any);
    authenticate(login: Login, callback: (errr: Error, item: Result) => any);
    logout(id: string, callback: (errr: Error, item: Result) => any);
}
export class AccountService implements IAccountService {

    public constructor(public repository: IUserRepository) {

    }

    register(data: Register, callback: (item: Result) => any) {
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
            }else{
                result.Success = false;
            }

            callback(result);
        });
    }

    getUserInfo(id: string, callback: (errr: Error, item: UserInfo) => any) { }
    changePassword(id: string, data: any, callback: (errr: Error, item: Result) => any) { }
    forgotPassword(id: string, callback: (errr: Error, item: Result) => any) { }
    authenticate(login: Login, callback: (errr: Error, item: Result) => any) { }
    logout(id: string, callback: (errr: Error, item: Result) => any) { }


    generateToken() : string{
        return "";
    }
}
