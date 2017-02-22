import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Post } from '../models/post';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IPostingService, PostingService } from '../services/postingService';
import { IPostingRepository, PostingRepository } from '../repository/postingRepository';
import { PostingController, IPostingController } from '../controllers/postingController';

var self;
export class PostRoute{
    postingService: IPostingService;
    postingController: IPostingController;

    constructor(public app: Express) {       
        self = this;
        this.post();
        this.get();
        this.getByUser();
    }

    get() {
        this.app.get('/api/posts', (req: Request, res: Response) => {
            self.setCollection();  
            logger.debug('Inside child route posting get-------');
            self.postingController.getEntities(req, res);
        });
    }

    getByUser() {
        this.app.get('/api/posts/getByUser', (req: Request, res: Response) => {
            self.setCollection();  
            logger.debug('Inside child route posting get-------');
            self.postingController.getPostByUser(req, res);
        });
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