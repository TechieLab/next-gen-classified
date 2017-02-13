import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Post } from '../models/post';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IPostingService, PostingService } from '../services/postingService';
import { IPostingRepository,PostingRepository } from '../repository/postingRepository';
import { PostingController, IPostingController } from '../controllers/postingController';

var self;
export class PostRoute extends BaseApiRoute<Post> implements IBaseApiRoute<Post>{
    postingService : IPostingService;
    postingController : IPostingController;

    constructor(public app: Express) {
        super(app, "posts");
        self = this;
        this.post();
    }

     post() {
        this.app.post('/api/posts', (req: Request, res: Response) => {
            self.setCollection();
            self.postingController.createEntity(req, res);
        });
    }

    setCollection() {
        var repository = new PostingRepository();
        this.postingService = new PostingService(repository);
        this.postingController = new PostingController(this.postingService);
    }
}