
import logger = require('logger');

import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { ProductRepository, IProductRepository } from '../repository/productRepository';

import { IProduct } from '../models/product';
import { IPost } from '../models/post';

export interface IPostingRepository extends IBaseRepository<IPost> { }

export class PostingRepository extends BaseRepository<IPost> implements IPostingRepository {
    productRepository: IProductRepository;

    constructor() {
        super("posts");
    }

    public create(data: IPost, callback: (errr: Error, item: IPost) => any) {
        logger.log('debug', 'called create data..');

        if (!data) {
            callback(new Error('Empty'), null);
        }

        var collection = this.db.collection(this.collectionName);
        collection.insert(data, (err, res) => {
            logger.log('debug', 'inserted post..');

            if (res) {
                var product = <IProduct>{};
                product.Name = data.ProductName;
                product.Category = data.Category;
                product.Price = data.Price;
                product.Location = data.Location;

                this.productRepository = new ProductRepository();
                this.productRepository.create(product, (err1, res1) => {
                    logger.log('debug', 'inserted product..');
                    callback(err, res.ops[0]);
                });
            }
        });
    }
}

