import 'rxjs/add/operator/toPromise';

import {Component , Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, URLSearchParams } from '@angular/http';
import {Post} from '../models/post';
import { Client, SearchResponse } from "elasticsearch";


export interface IElasticSearchService{
   search(val:string,offset:any)
}

@Injectable()
export class ElasticSearchService implements IElasticSearchService{
    
    private client;
    constructor(){
         if (!this.client) this.connect();
    }

   connect(){
        this.client = new Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
   }    

    search(term, offset){
      if (term) {
            console.log(term);
            var query = {
                         match: {
                                _all: term
                          }
                       };
           this.client.search({
                index: 'recipes',
                type:  'recipe',
                body: {
                    size: 10,
                    from: (offset || 0) * 10,
                    query: query
                }
            }).then(function(){});
        } 
    }
}