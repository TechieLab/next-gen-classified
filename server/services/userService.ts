
import { User } from '../models/User';
import { IUserRepository } from '../repository/UserRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IUserService extends IBaseService<User> {

}
export class UserService extends BaseService<User> implements IUserService {
    repository: IUserRepository;

    public constructor(repository: IUserRepository) {
        super(repository);
    }
}
