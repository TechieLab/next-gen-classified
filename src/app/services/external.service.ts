import '../../rxjs-operators';
import 'rxjs/add/operator/map';

import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class ExternalService{
    constructor( @Optional() public http: Http, entityName: string) {
       
    }

    getCity() {
        this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=52.154184,6.199592&sensor=true');
    }
}