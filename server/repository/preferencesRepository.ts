
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Preferences } from '../models/Preferences';



export interface IPreferencesRepository extends IBaseRepository<Preferences> {

}

export class PreferencesRepository extends BaseRepository<Preferences> implements IPreferencesRepository {
   
    constructor() {
        super('preferences');
    }
}

