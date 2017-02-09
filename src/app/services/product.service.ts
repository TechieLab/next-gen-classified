import { Injectable, Optional } from '@angular/core';
import { Product } from '../../app/models/product';
import { IBaseService, BaseService } from '../../app/services/base.service'

import { Http, URLSearchParams } from '@angular/http';

export interface IProductService extends IBaseService<Product> { }

@Injectable()
export class ProductService extends BaseService<Product> implements IProductService {  

    constructor(public http: Http){
        super(http, "products");
    }    
}