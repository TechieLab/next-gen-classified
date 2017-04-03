import { Observable } from 'rxjs/Observable';

import { Injectable, Optional } from '@angular/core';
import { Post } from '../../app/models/post';
import { IBaseService, BaseService } from '../../app/services/base.service';
import { Offer } from '../../app/models/offer';
import { Http, URLSearchParams } from '@angular/http';
import { Constants } from '../../app/common/constants';

export interface IOfferService extends IBaseService<Offer> { 
    
}

@Injectable()
export class OfferService extends BaseService<Offer> implements IOfferService {  
 
    constructor(public http: Http){
        super(http, 'offers');
    }

    
}