import { Injectable, Optional } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Profile } from '../../app/models/profile';
import { IBaseService, BaseService } from '../../app/services/base.service'

export interface IProfileService extends IBaseService<Profile> {   }

@Injectable()
export class ProfileService extends BaseService<Profile> implements IProfileService {  

    constructor(public http: Http){
        super(http, "profile");
    }
}