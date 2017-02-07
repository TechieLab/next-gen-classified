
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { IProduct } from '../models/Product';

export interface IProductRepository extends IBaseRepository<IProduct> {}

export class ProductRepository extends BaseRepository<IProduct> implements IProductRepository {  
    constructor() {
        super('products');
    }
}

