
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { User } from '../models/User';
import { Login } from '../models/Account';



export interface IUserRepository extends IBaseRepository<User> {
  authenticate(data:Login ,callback: (errr: Error, item) => any);
}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  
    constructor() {
        super('users');
    }
    
     public authenticate(data:Login ,callback: (errr: Error, item) => any){
        var user = new Login();
       
        user.UserName =  data.UserName;
        user.Password = data.Password;

       this.collection.findOne({ "UserName":user.UserName,"Password":user.Password }, function (err, results) {
            logger.debug('debug', 'reading get data..with id..');
            console.log('sourabh datatat',results);
            callback(err, results);
        });
    }
   
}

