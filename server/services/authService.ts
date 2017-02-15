
import { Post } from '../models/post';
import { IAuthRepository } from '../repository/authRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IAuthService extends IBaseService<Post> {

}
export class AuthService extends BaseService<Post> implements IAuthService {
    repository: IAuthRepository;

    public constructor(repository: IAuthRepository) {
        super(repository);
    }
}
