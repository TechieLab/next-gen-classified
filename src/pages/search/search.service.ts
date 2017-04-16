import { Injectable, Optional } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Post } from '../../app/models/post';
import { IBaseService, BaseService } from '../../app/services/base.service'

export interface ISearchService extends IBaseService<Post> {
}

@Injectable()
export class SearchService extends BaseService<Post> implements ISearchService {
    constructor(public http: Http) {
        super(http, "search");
    }
}