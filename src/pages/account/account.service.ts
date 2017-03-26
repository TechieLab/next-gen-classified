
import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../../app/models/login';
import { User } from '../../app/models/user';
import { StorageService } from '../../app/services/storage.service';
import { Constants } from '../../app/common/constants';
import { Login, SignUp } from '../../app/models/login';

export interface IAccountService {
    register(data: SignUp);
    login(data: Login);
    logout();
    forgotPassword();
    changePassword(data:ChangePassword);
}

@Injectable()
export class AccountService implements IAccountService {

    url: string;
    options: RequestOptions;
    token: string;

    constructor(public http: Http) {
        this.url = Constants.AccountApi;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({
            headers: headers
        });
    }

    register(data: SignUp) {
        var user = new User();
        user.Password = data.Password;
        user.UserName = data.UserName;
        user.EmailId = data.EmailId;
        user.Profile.FullName = data.FullName;
        user.Profile.Contact.EmailId = data.EmailId;      

        return this.http.post(this.url + 'signup', user, this.options)
            .map(this.extractData).catch(this.handleError);
    }

    login(data: Login) {
        return this.http.post(this.url + 'login', data, this.options)
            .map(this.extractData).catch(this.handleError);
    }

    logout() {
        // clear token remove user from local storage to log user out
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': StorageService.getToken() });
        this.options = new RequestOptions({
            headers: headers
        });
        return this.http.get(this.url + 'logout', this.options)
            .map(this.extractData).catch(this.handleError);

    }

    forgotPassword() { }

    changePassword(data:ChangePassword) { 
        // clear token remove user from local storage to log user out
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': StorageService.getToken() });
        this.options = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.url + 'changepassword',data,this.options)
            .map(this.extractData).catch(this.handleError);
     }

    generateAuthToken() { }

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
