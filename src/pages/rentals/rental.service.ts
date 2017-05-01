import { Injectable, Optional } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Rental } from '../../app/models/rental';
import { IBaseService, BaseService } from '../../app/services/base.service'

export interface IRentalService extends IBaseService<Rental> {
}

@Injectable()
export class RentalService extends BaseService<Rental> implements IRentalService {
    constructor(public http: Http) {
        super(http, "rentals");
    }
}