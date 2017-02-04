
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Profile } from '../models/Profile';


export interface IProfileRepository extends IBaseRepository<Profile> {

}

export class ProfileRepository extends BaseRepository<Profile> implements IProfileRepository {
 
    constructor( ) {
        super('profiles');
    }
}

