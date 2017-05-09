
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Rental } from '../models/index';

export interface IRentalRepository extends IBaseRepository<Rental> {

}

export class RentalRepository extends BaseRepository<Rental> implements IRentalRepository {
    
    constructor() {
        super('rentals');
    }
} 
