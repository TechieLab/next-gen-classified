import { Observable } from 'rxjs/Observable';

import { Injectable, Optional } from '@angular/core';
import { Post } from '../../app/models/post';
import { IBaseService, BaseService } from '../../app/services/base.service';
import { Http, URLSearchParams } from '@angular/http';
import { Constants } from '../../app/common/constants';

export interface IPostService extends IBaseService<Post> { 
    addRemoveFavorite(postId : string,remove:boolean);
    getFavorite();
}

@Injectable()
export class PostService extends BaseService<Post> implements IPostService {  
 
    constructor(public http: Http){
        super(http, 'posts');
    }

    getFavorite(){
       var url = Constants.BaseApi + '/api/all-posts/favorite' ;
       this.setUrl(url);
       return this.get();
    }

  addRemoveFavorite(postId : string, remove:boolean){
       var url = Constants.PostApi + postId + '/favorite';
       if(remove){
           url += '?remove=true';
       }
       
       this.setUrl(url);
       return this.get();
    }
}