import { Injectable, Optional } from '@angular/core';
import { ILookup } from '../models/lookup';
import { IBaseService, BaseService } from './base.service'
import { Http, URLSearchParams } from '@angular/http';

export interface ILookupService extends IBaseService<ILookup> {
    getCategories();
}

@Injectable()
export class LookupService extends BaseService<ILookup> implements ILookupService {

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