import { Injectable, Optional } from '@angular/core';
import { Lookup } from '../models/lookup';
import { IBaseService, BaseService } from './base.service'
import { Http, URLSearchParams } from '@angular/http';

export interface ILookupService extends IBaseService<Lookup> {
    getCategories();
}

@Injectable()
export class LookupService extends BaseService<Lookup> implements ILookupService {

    private params: URLSearchParams;

    constructor(public http: Http){
        super(http, "lookups");
        this.params = new URLSearchParams();
    }

    getCategories() {       
        this.params.set('key', 'category');
        return this.getByQuery(this.params);
    }
}