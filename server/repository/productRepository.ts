
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Product } from '../models/Product';



export interface IProductRepository extends IBaseRepository<Product> {

}

export class ProductRepository extends BaseRepository<Product> implements IProductRepository {
    db: Db;
    constructor(database: Db) {
        super(database);
    }
}

