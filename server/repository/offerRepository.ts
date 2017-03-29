
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Offer } from '../models/offer';


export interface IOfferRepository extends IBaseRepository<Offer> {
 
}

export class OfferRepository extends BaseRepository<Offer> implements IOfferRepository {
  
    constructor() {
        super('offers');
    }   
}

