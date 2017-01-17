import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {EventEmitter} from '@angular/core';
import {IUser} from '../models/user';
import {LoginModel} from '../models/login';
import {IResult} from '../models/result';

@Injectable()
export class AuthService { 
        
    constructor() {
        
    }   
}