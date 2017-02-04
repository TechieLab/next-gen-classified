
import { IUser } from '../models/User';
import { IUserRepository } from '../repository/UserRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IUserService extends IBaseService<IUser> {

}
export class UserService extends BaseService<IUser> implements IUserService {
    repository: IUserRepository;

    public constructor(repository: IUserRepository) {
        super(repository);
    }
}
