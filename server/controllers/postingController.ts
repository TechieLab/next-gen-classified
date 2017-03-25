import logger = require('winston');
import { ObjectID } from 'mongodb';
import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Result } from '../models/result';
import { Media } from '../models/media';

export interface IPostingController extends IBaseController<Post> {

}
var self;
export class PostingController extends BaseController<Post> implements IPostingController {

    public result: Result;

    constructor(public postingService: IPostingService) {
        super(postingService);
    }

    public create(req: Request, res: Response) {
        var data = req.body;
        var post = new Post();

        post.UserId = req['userId'];
        post.Title = data.Title;
        post.Product.Description.Price = data.Price;
        post.Product.Description.PurchasedOn = data.PurchasedOn;
        post.Product.Description.Brand = data.Brand;
        post.Product.Description.Defects = data.Defects;
        post.Category = data.Category;
        post.Location = data.Location;

        logger.log('debug', 'PostingController creating post ----', post);

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

    upload(req: any, res: any) {
        console.log(req.file);
        this.postingService.getById(req.params.id, (err, post) => {

            if (post && req.file) {
                //for (var i = 0; i < req.files.length; i++) {
                var media = new Media();
                media.Name = req.file.originalname;
                media.ImageUrl = 'http://192.168.0.105:3000/images/' + req.file.originalname;
                media.SizeInBytes = req.file.size;

                post.Product.Photos.push(media);
                //}

                this.postingService.update(post._id.toString(), post, (err, item) => {
                    if (err) logger.log('debug', 'create posting err---', err);

                    this.result = {
                        Message: 'Post update with media',
                        Success: true,
                        Content: item
                    };

                    return res.json(this.result);
                });
            }
        });
    }

    //  get(req : any , res : any){

    //     req.query.UserId = <ObjectID>(req['userId']);
    //     req.query.Title = new RegExp('^' + req.query.Title);

    //     logger.log('debug', 'postings controller get');

    //     this.postingService.get(req.query, (err, item) => {
    //         if (err) logger.log('debug', 'get err---', err);

    //         return res.json(item);
    //     });
    //  }


}
