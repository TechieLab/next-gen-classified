
import { IProduct } from '../models/Product';
import { IProductRepository } from '../repository/ProductRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IProductService extends IBaseService<IProduct> {

}
export class ProductService extends BaseService<IProduct> implements IProductService {
    repository: IProductRepository;

    public constructor(repository: IProductRepository) {
        super(repository);
    }
}
