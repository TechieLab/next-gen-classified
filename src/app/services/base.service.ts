import '../../rxjs-operators';
import 'rxjs/add/operator/map';

import {Injectable, Optional} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {IResult} from '../models/result';

@Injectable()
export class BaseService<TEntity> {

    url: string;
    entity: TEntity;

    constructor( @Optional() public http: Http, entityName : string) {
        this.url = '/api/' + entityName;
    }

    get(): Observable<Array<TEntity>> {
        this.url = this.url + '/get';
        return this.http.get(this.url).map(this.extractData).catch(this.handleError);
    }

    getCity(){
        this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=52.154184,6.199592&sensor=true');
    }

    getById(id: string): Observable<TEntity> {
        this.url = this.url + '/get/' + id;
        return this.http.get(this.url).map(this.extractData).catch(this.handleError);
    }

    getByUserId(id: string): Observable<TEntity> {
        this.url = this.url + '/getByUser/' + id;
        return this.http.get(this.url).map(this.extractData).catch(this.handleError);
    }

    post(entity: TEntity): Observable<IResult> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(entity: TEntity): Observable<IResult> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    del(id: string): Observable<IResult> {
        return this.http.delete(this.url).map(this.extractData).catch(this.handleError);
    }
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
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