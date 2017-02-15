import { MongoDBConnection } from '../data/connection';
import { Db, Collection } from 'mongodb';

import Logger from '../Logger';
const logger = Logger('server');

import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { ProductRepository, IProductRepository } from '../repository/productRepository';

import { Product } from '../models/product';
import { Post } from '../models/post';

export interface IAuthRepository extends IBaseRepository<Post> { }

export class AuthRepository extends BaseRepository<Post> implements IAuthRepository {
    
    db: Db;
    collection: Collection;

    constructor(public collectionName: string) {
        super(collectionName);
    }

    public create(data: Post, callback: (errr: Error, item: Post) => any) {
    }
}

