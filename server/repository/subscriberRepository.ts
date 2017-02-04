
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Subscriber } from '../models/Subscriber';


export interface ISubscriberRepository extends IBaseRepository<Subscriber> {

}

export class SubscriberRepository extends BaseRepository<Subscriber> implements ISubscriberRepository {
    
    constructor() {
        super('subscribers');
    }
} 
