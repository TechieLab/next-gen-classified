
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { IUser } from '../models/User';



export interface IUserRepository extends IBaseRepository<IUser> {

}

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  
    constructor() {
        super('users');
    }
}

