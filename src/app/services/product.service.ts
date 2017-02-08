import { Injectable, Optional } from '@angular/core';
import { IProduct } from '../../app/models/product';
import { IBaseService, BaseService } from '../../app/services/base.service'

import { Http, URLSearchParams } from '@angular/http';

export interface IProductService extends IBaseService<IProduct> { }

@Injectable()
export class ProductService extends BaseService<IProduct> implements IProductService {  

    constructor(public http: Http){
        super(http, "products");
    }    
}