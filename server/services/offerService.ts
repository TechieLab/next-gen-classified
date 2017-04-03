
import { Offer } from '../models/offer';
import { IOfferRepository } from '../repository/OfferRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IOfferService extends IBaseService<Offer> {

}
export class OfferService extends BaseService<Offer> implements IOfferService {
    repository: IOfferRepository;

    public constructor(repository: IOfferRepository) {
        super(repository);
    }
}
