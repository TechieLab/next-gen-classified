import Logger from '../Logger';
const logger = Logger('server');

import { BaseRepository, IBaseRepository } from '../repository/baseRepository';

import { Product } from '../models/product';
import { Post } from '../models/post';

export interface IPostingRepository extends IBaseRepository<Post> { }

export class PostingRepository extends BaseRepository<Post> implements IPostingRepository {
    

    constructor() {
        super("posts");
    }
}

