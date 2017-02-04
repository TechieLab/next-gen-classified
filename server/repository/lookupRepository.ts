
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { ILookup } from '../models/Lookup';

export interface ILookupRepository extends IBaseRepository<ILookup> {

}

export class LookupRepository extends BaseRepository<ILookup> implements ILookupRepository {
   
    constructor() {
        super('lookups');
    }
}

