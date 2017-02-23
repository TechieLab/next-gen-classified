import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Post } from '../models/post';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IPostingService, PostingService } from '../services/postingService';
import { IPostingRepository, PostingRepository } from '../repository/postingRepository';
import { PostingController, IPostingController } from '../controllers/postingController';

var self;
export class PostRoute extends BaseApiRoute<Post> implements IBaseApiRoute<Post>{
    postingController: IPostingController;

    constructor(public app: Express) {
        super(app, 'posts');
        self = this;

        this.post();
    }

    post() {
        var repository = new PostingRepository()
        var service = new PostingService(repository);
        var controller = new PostingController(service);

        this.app.post('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            console.log('inside posting controller');
            controller.create(req, res);
        });
    }
}