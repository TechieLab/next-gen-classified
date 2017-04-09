import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { Injectable, Optional } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Result } from '../models/result';
import { Location } from '../models/location';

@Injectable()
export class ExternalService {
    url: string;
    static http: Http;
    static jsonp: Jsonp;

    constructor(private http: Http, private jsonp: Jsonp) {
        this.http = http;
        this.jsonp = jsonp;
    }
    getCurrentLocation(): Promise<Location> {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition().then((resp) => {
                this.getCity(resp).subscribe((res: any) => {
                    resolve(this.transformData(res));
                });
            }).catch((error) => {
                console.log('Error getting Location', error);
                reject(null);
            });
        });
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

    private transformData(data) {
        var location = new Location();

        location.AddressLine1 = JSON.parse(data._body)['results']['0']['address_components']['0']['long_name'];
        location.AddressLine2 = JSON.parse(data._body)['results']['0']['address_components']['1']['long_name'];
        location.Street = JSON.parse(data._body)['results']['0']['address_components']['2']['long_name'];
        location.Locality = JSON.parse(data._body)['results']['0']['address_components']['3']['long_name'];
        location.City = JSON.parse(data._body)['results']['0']['address_components']['4']['long_name'];
        location.Province = JSON.parse(data._body)['results']['0']['address_components']['5']['long_name'];
        location.State = JSON.parse(data._body)['results']['0']['address_components']['6']['long_name'];
        location.Country = JSON.parse(data._body)['results']['0']['address_components']['7']['long_name'];
        location.ZipCode = JSON.parse(data._body)['results']['0']['address_components']['8']['long_name'];

        location.Cords.Lat = JSON.parse(data._body)['results']['0']['geometry']['location']['lat'];
        location.Cords.Long = JSON.parse(data._body)['results']['0']['geometry']['location']['lng'];

        location.FullAddress = JSON.parse(data._body)['results']['0']['formatted_address'];

        return location;
    }

    private getCity(resp) {
        let url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + resp.coords.latitude + ',' + resp.coords.longitude + '&sensor=true';
        return this.http.get(url);
    }


}