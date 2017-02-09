import { Injectable, Optional } from '@angular/core';
import { Post } from '../models/post';
import { IBaseService, BaseService } from './base.service'
import { Http, URLSearchParams } from '@angular/http';

export interface IPostService extends IBaseService<Post> { }

@Injectable()
export class PostService extends BaseService<Post> implements IPostService {  

    constructor(public http: Http){
        super(http, "posts");
    }    
}