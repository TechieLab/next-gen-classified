import { Injectable, Optional } from '@angular/core';
import { Post } from '../models/post';
import { IBaseService, BaseService } from './base.service'
import { Http, URLSearchParams } from '@angular/http';

export interface ILoginService extends IBaseService<Post> { }

@Injectable()
export class LoginService extends BaseService<Post> implements ILoginService {  
 
    constructor(public http: Http){
        super(http, 'register');
    }    
}