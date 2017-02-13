
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Lookup } from '../models/Lookup';

export interface ILookupRepository extends IBaseRepository<Lookup> {}

export class LookupRepository extends BaseRepository<Lookup> implements ILookupRepository {   
    constructor() {
        super('lookups');
    }
}

