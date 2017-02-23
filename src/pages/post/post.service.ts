import { Observable } from 'rxjs/Observable';

import { Injectable, Optional } from '@angular/core';
import { Post } from '../../app/models/post';
import { IBaseService, BaseService } from '../../app/services/base.service';
import { Http, URLSearchParams } from '@angular/http';
import { Constants } from '../../app/common/constants';

export interface IPostService extends IBaseService<Post> { 
}

@Injectable()
export class PostService extends BaseService<Post> implements IPostService {  
 
    constructor(public http: Http){
        super(http, 'posts');
    }
}