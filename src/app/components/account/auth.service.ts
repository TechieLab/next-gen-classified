import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {EventEmitter} from '@angular/core';
import {IUser} from '../models/user';
import {LoginModel} from '../models/login';
import {IResult} from '../models/result';

@Injectable()
export class AuthService {
    authchange: EventEmitter<any> = new EventEmitter();
        
    constructor(private http: Http, private _router: Router) {
        
    }

    emitAuthChangeEvent() {
        this.authchange.emit();
    }
    getAuthChangeEmitter() {
        return this.authchange;
    }

    authenticate(loginModel: LoginModel): Observable<IResult> {
        let body = "userName=" + loginModel.userName +
            "&password=" + loginModel.password;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('api/account/authenticate', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
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