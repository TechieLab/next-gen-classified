import { Injectable, Optional } from '@angular/core';
import { User } from '../../app/models/user';

import { IBaseService, BaseService } from '../../app/services/base.service'

import { Http, URLSearchParams } from '@angular/http';

export interface IUserService extends IBaseService<User> {
    getByUserName(userName : string);
 }

@Injectable()
export class UserService extends BaseService<User> implements IUserService {  

    constructor(public http: Http){
        super(http, "users");
    }    

    getByUserName(userName : string){
        var params = new URLSearchParams();
        params.set('UserName', userName );

        return this.getByQuery(params);
    }
}