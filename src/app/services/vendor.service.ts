import 'rxjs/add/operator/map';

import {Injectable, Optional} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams,Jsonp} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {Result} from '../models/result';

@Injectable()
export class VendorService {
    url: string;
    constructor(public http: Http,private jsonp: Jsonp) {}
   
    getCity(resp){
       let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + resp.coords.latitude +','+resp.coords.longitude +'&sensor=true'; 
       return this.http.get(url);
    }

    search(term: string) {
    var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
                .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
                .map((request) => request.json()[1]);
  }
}