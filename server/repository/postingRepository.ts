import Logger from '../Logger';
const logger = Logger('server');

import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { ProductRepository, IProductRepository } from '../repository/productRepository';

import { Product } from '../models/product';
import { Post } from '../models/post';

export interface IPostingRepository extends IBaseRepository<Post> { }

export class PostingRepository extends BaseRepository<Post> implements IPostingRepository {
    productRepository: IProductRepository;

    constructor() {
        super("posts");
    }

    public create(data: Post, callback: (errr: Error, item: Post) => any) {
        logger.debug('debug', 'called create data..');

        if (!data) {
            callback(new Error('Empty'), null);
        }

        var collection = this.db.collection(this.collectionName);
        collection.insert(data, (err, res) => {
            logger.debug('debug', 'inserted post..');

            if (res) {
                var product = new Product();
                //product.Name = data.ProductName;
                //product.Category = data.Category;
                //product.Location = data.Location;
                //product.Description.Price = data.Price;

                this.productRepository = new ProductRepository();
                this.productRepository.create(product, (err1, res1) => {
                    logger.debug('debug', 'inserted product..');
                    callback(err, res.ops[0]);
                });
            }
        });
    }
}

