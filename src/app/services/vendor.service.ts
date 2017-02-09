import 'rxjs/add/operator/map';

import {Injectable, Optional} from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import {Result} from '../models/result';

@Injectable()
export class VendorService {
    url: string;
    constructor(public http: Http) {}
   
    getCity(resp){
       let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + resp.coords.latitude +','+resp.coords.longitude +'&sensor=true'; 
       return this.http.get(url);
    }
}