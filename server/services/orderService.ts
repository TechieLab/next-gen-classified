
import { Order } from '../models/Order';
import { IOrderRepository } from '../repository/OrderRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IOrderService extends IBaseService<Order> {

}
export class OrderService extends BaseService<Order> implements IOrderService {
    repository: IOrderRepository;

    public constructor(repository: IOrderRepository) {
        super(repository);
    }
}
