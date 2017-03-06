import {Component , Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import {Post} from '../models/post';
import { Client, SearchResponse } from "elasticsearch";
import { StorageService } from './storage.service';


@Injectable()
export class ElasticSearchService {

    url: string;
    entity: any;
    options: RequestOptions;
    private client : Client;

    constructor(@Optional() public http: Http){
         if (!this.client) this.connect();
        
        this.url = 'http://localhost:9200' ;
        this.setAuthHeader();
    }

   connect(){
        this.client = new Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
   }    

    search() : Observable<Array<any>>{
        
        this.setAuthHeader();
        var url = this.url + '/library/article/_search';
        return this.http.get(url, this.options).map(this.extractData).catch(this.handleError);
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