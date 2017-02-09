
import { Product } from '../models/Product';
import { IProductRepository } from '../repository/ProductRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IProductService extends IBaseService<Product> {

}
export class ProductService extends BaseService<Product> implements IProductService {
    repository: IProductRepository;

    public constructor(repository: IProductRepository) {
        super(repository);
    }
}
