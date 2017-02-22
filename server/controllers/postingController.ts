import logger = require('winston');
import { ObjectID } from 'mongodb';
import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Result } from '../models/result';

export interface IPostingController extends IBaseController<Post> {
    getPostByUser(req: Request, res: Response);
}
var self;
export class PostingController extends BaseController<Post> implements IPostingController {

    public result: Result;

    constructor(public postingService: IPostingService) {
        super(postingService);
    }

    public getEntities(req: Request, res: Response) {
        var userId = null, query;

        if (req.query) {
            query = req.query;
        }

        query.UserId = { $ne: <ObjectID>(req['userId']) };

        this.baseService.get(query, (err, item) => {
            if (err) logger.log('debug', 'getEntities err---', err);

            logger.log('debug', 'getEntities')

            return res.json(item);
        });
    }

    public getPostByUser(req: Request, res: Response) {
        var userId = <ObjectID>(req['userId']);

        this.baseService.getByUserId(userId, req.query, (err, item) => {
            if (err) logger.log('debug', 'getEntities err---', err);

            logger.log('debug', 'getPostByUser-------' + userId)

            return res.json(item);
        });
    }

    public createEntity(req: Request, res: Response) {
        var data = req.body;
        var post = new Post();

        post.UserId = req['userId'];
        post.Title = data.Title;
        post.Product.Description.Price = data.Price;
        post.Product.Description.PurchasedOn = data.PurchasedOn;
        post.Product.Description.Brand = data.Brand;
        post.Product.Description.Defects = data.Defects;
        post.Product.Category = data.Category;
        post.Location = data.Location;

        logger.log('debug', 'creating post ----', post);

        return this.postingService.create(post, (err, item) => {
            if (err) logger.log('debug', 'create posting err---', err);

            this.result = {
                Message: 'Entity created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }
}
