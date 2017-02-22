import '../rxjs-operators';
import 'rxjs/add/operator/map';

import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Result } from '../models/result';
import { Constants } from '../common/constants';
import { StorageService } from './storage.service';

export interface IBaseService<TEntity> {
    get(): Observable<Array<TEntity>>;
    getById(id: string): Observable<TEntity>;
    getByUserId(): Observable<Array<TEntity>>;
    getByQuery(params: URLSearchParams): Observable<Array<TEntity>>;
    post(entity: TEntity): Observable<Result>;
    put(entity: TEntity): Observable<Result>;
    del(id: string): Observable<Result>
}

@Injectable()
export class BaseService<TEntity> implements IBaseService<TEntity> {

    url: string;
    entity: TEntity;
    options: RequestOptions;

    constructor( @Optional() public http: Http, entityName: string) {
        this.url = Constants.baseApi + '/api/' + entityName;

        this.setAuthHeader();
    }

    get(): Observable<Array<TEntity>> {       
        this.setAuthHeader();
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    getById(id: string): Observable<TEntity> {
        this.url = this.url + '/' + id;
        this.setAuthHeader();
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    getByUserId(): Observable<Array<TEntity>> {
        this.url = this.url + '/getByUser';
        this.setAuthHeader();
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    getByQuery(params: URLSearchParams): Observable<Array<TEntity>> {
        this.setAuthHeader();
        this.options.search = params;
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    }

    post(entity: TEntity): Observable<Result> {
        let body = JSON.stringify(entity);
        this.setAuthHeader();

        return this.http.post(this.url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(entity: TEntity): Observable<Result> {
        let body = JSON.stringify(entity);
        this.setAuthHeader();
        return this.http.put(this.url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    del(id: string): Observable<Result> {
        this.url = this.url + '/' + id;
        this.setAuthHeader();
        return this.http.delete(this.url, this.options).map(this.extractData).catch(this.handleError);
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

    private setAuthHeader() {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': StorageService.getToken() });
        this.options = new RequestOptions({
            headers: headers
        });
    }  
}