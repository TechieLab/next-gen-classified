
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { IPost } from '../models/post';

export interface IPostingRepository extends IBaseRepository<IPost> {
}

export class PostingRepository extends BaseRepository<IPost> implements IPostingRepository {   
    constructor() {
        super("posts");
    }
}

