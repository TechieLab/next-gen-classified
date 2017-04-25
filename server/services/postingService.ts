
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

    public getById(id: string, callback: (errr: Error, item: Post) => any){
        logger.debug('inside posting service getById.......');
        this.repository.getById(id, callback);
    }

    public get(query: any, callback: (errr: Error, item: Array<Post>) => any){
        logger.debug('inside posting service get.......');
        this.repository.get(query, callback);
    }
}
