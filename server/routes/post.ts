import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
var multer = require('multer');
import { Post } from '../models/post';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IPostingService, PostingService } from '../services/postingService';
import { IPostingRepository, PostingRepository } from '../repository/postingRepository';
import { PostingController, IPostingController } from '../controllers/postingController';

var upload = multer({ dest: './uploads/' });

var self;
export class PostRoute extends BaseApiRoute<Post> implements IBaseApiRoute<Post>{

    postingController: IPostingController;
    repository: PostingRepository;
    service: PostingService;

    constructor(public app: Express) {
        super(app, 'posts');
        self = this;

        this.post();
        this.addFavorite();
        this.getFavorite();
        this.upload();
    }

    post() {
        this.app.post('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            logger.debug("route posting post----" + this.apiName);
            self.setPostCollection();
            this.postingController.create(req, res);
        });
    }

    upload() {
        this.app.post('/api/posts/:id/upload', function (req: Request, res: Response, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
            self.setPostCollection();
            logger.debug("/api/posts/:id/upload----");
            self.postingController.upload(req, res);
        });
    }

    addFavorite() {
        this.app.get('/api/posts/:id/favorite', function (req: Request, res: Response, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
            self.setPostCollection();
            logger.debug("/api/posts/:id/favorite----");
            self.postingController.addFavorite(req, res);
        });
    }

    getFavorite(){
        this.app.get('/api/all-posts/favorite', function (req: Request, res: Response, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
            self.setPostCollection();
            logger.debug("/api/posts/favorite----");
            self.postingController.getFavorite(req, res);
        });
    }

    private setPostCollection() {
        this.repository = new PostingRepository()
        this.service = new PostingService(this.repository);
        this.postingController = new PostingController(this.service);
    }
}