
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Order } from '../models/Order';



export interface IOrderRepository extends IBaseRepository<Order> {

}

export class OrderRepository extends BaseRepository<Order> implements IOrderRepository {
    db: Db;
    constructor(database: Db) {
        super(database);
    }
}

