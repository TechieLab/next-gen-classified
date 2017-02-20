import '../rxjs-operators';
import 'rxjs/add/operator/map';

import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { IBaseService, BaseService } from './base.service'
import { Constants } from '../common/constants';
import { Login, SignUp } from '../models/login';

export interface IAccountService {
    register(data: SignUp);
    login(data: Login);
    logout();
    forgotPassword();
    changePassword();
}

@Injectable()
export class AccountService implements IAccountService {

    url: string;
    options: RequestOptions;

    constructor(public http: Http) {
        this.url = Constants.baseApi + '/' + Constants.accountApi;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({
            headers: headers
        });
    }

    register(data: SignUp) {
        return this.http.post(this.url + '/signup', data, this.options)
            .map(this.extractData).catch(this.handleError);
    }

    login(data: Login) {
        return this.http.post(this.url + '/login', data, this.options)
            .map(this.extractData).catch(this.handleError);
    }

    logout() { }

    forgotPassword() { }

    changePassword() { }

    generateAuthToken(){
        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || body;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
