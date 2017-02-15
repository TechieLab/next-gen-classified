import '../rxjs-operators';
import 'rxjs/add/operator/map';

import {Injectable, Optional} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import { User } from '../models/user';
import { IBaseService, BaseService } from './base.service'
import {Constants} from '../common/constants';

@Injectable()
export class AuthService {  
 
    url: string;
    options : RequestOptions;
    
    constructor(public http: Http){
        this.url = Constants.baseApi + '/' +Constants.authApi;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({
            headers: headers
        });
    }  
    
    register(data:any){
        return this.http.post(this.url + '/create', data, this.options).map(this.extractData).catch(this.handleError);
    }

    login(){

    }

    logout(){}

    forgotPassword(){}

    changePassword(){}

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
