
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { User } from '../models/User';
import { Login } from '../models/Account';



export interface IUserRepository extends IBaseRepository<User> {
 
}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  
    constructor() {
        super('users');
    }   
}

