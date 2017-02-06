
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { IOrder } from '../models/Order';



export interface IOrderRepository extends IBaseRepository<IOrder> {

}

export class OrderRepository extends BaseRepository<IOrder> implements IOrderRepository {
   
    constructor() {
        super("orders");
    }
}

