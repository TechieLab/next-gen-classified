
import { IPost } from '../models/post';
import { IPostingRepository } from '../repository/postingRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IPostingService extends IBaseService<IPost> {

}
export class PostingService extends BaseService<IPost> implements IPostingService {
    repository: IPostingRepository;

    public constructor(repository: IPostingRepository) {
        super(repository);
    }
}
