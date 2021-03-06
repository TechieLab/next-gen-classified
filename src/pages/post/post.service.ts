import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable, Optional } from '@angular/core';
import { Post } from '../../app/models/post';
import { IBaseService, BaseService } from '../../app/services/base.service';
import { Http, URLSearchParams } from '@angular/http';
import { Constants } from '../../app/common/constants';

export interface IPostService extends IBaseService<Post> {
    addRemoveFavorite(postId: string, remove: boolean);
    getFavorite();
    setLogged(logged: boolean);
    getLogged();
}

@Injectable()
export class PostService extends BaseService<Post> implements IPostService {

    private logged: boolean;
    private params: URLSearchParams;
    private subject: Subject<boolean> = new Subject<boolean>();

    constructor(public http: Http) {
        super(http, 'posts');
        this.params = new URLSearchParams();
    }

    getFavorite() {
        this.params.set('favorite', 'true');
        return this.getByQuery(this.params);
    }

    addRemoveFavorite(postId: string, remove: boolean) {
        var url = '/api/posts/' + postId + '/favorite';
        url += '?remove=' + remove;
        return this.customGet(url);
    }

    setLogged(logged: boolean): void {
        debugger;
        this.logged = logged;
        this.subject.next(logged);
    }

    getLogged(): Observable<boolean> {
        return this.subject.asObservable();
    }
}