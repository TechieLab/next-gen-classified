
import { Post } from '../models/post';
import { IPostingRepository } from '../repository/postingRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IPostingService extends IBaseService<Post> {

}
export class PostingService extends BaseService<Post> implements IPostingService {
    repository: IPostingRepository;

    public constructor(repository: IPostingRepository) {
        super(repository);
    }
    public get(query: any, callback: (errr: Error, item: Array<Post>) => any){
        logger.debug('inside posting service get.......');
        this.repository.get(query, callback);
    }
}
