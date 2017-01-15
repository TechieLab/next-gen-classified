
import { Subscriber } from '../models/Subscriber';
import { ISubscriberRepository } from '../repository/SubscriberRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface ISubscriberService extends IBaseService<Subscriber> {

}
export class SubscriberService extends BaseService<Subscriber> implements ISubscriberService {
    repository: ISubscriberRepository;

    public constructor(repository: ISubscriberRepository) {
        super(repository);
    }
}
