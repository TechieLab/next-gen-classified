import { Injectable, Optional } from '@angular/core';
import { IPost } from '../models/post';
import { IBaseService, BaseService } from './base.service'
import { Http, URLSearchParams } from '@angular/http';

export interface IPostService extends IBaseService<IPost> { }

@Injectable()
export class PostService extends BaseService<IPost> implements IPostService {  

    constructor(public http: Http){
        super(http, "posts");
    }    
}