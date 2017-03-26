import logger = require('winston');
import { ObjectID } from 'mongodb';
import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Result } from '../models/result';
import { Media } from '../models/media';
import { Settings } from '../config/settings'

export interface IPostingController extends IBaseController<Post> {
    create(req: Request, res: Response);
    upload(req: any, res: Response);
    addFavorite(req: Request, res: Response);
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

    public upload(req: any, res: Response) {
        console.log(req.file);
        this.postingService.getById(req.params.id, (err, post) => {

            if (post && req.file) {
                //for (var i = 0; i < req.files.length; i++) {
                var media = new Media();
                media.Name = req.file.originalname;
                media.ImageUrl = Settings.BackendHost + Settings.ImageRepository + req.file.originalname;
                media.SizeInBytes = req.file.size;

                post.Product.Photos.push(media);
                //}

                this.postingService.update(post._id.toString(), post, {}, (err, item) => {
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

    public addFavorite(req: Request, res: Response) {
        this.postingService.getById(req.params.id, (err, post) => {

            if (post) {
                if (!post.Likes) {
                    post.Likes = new Array<string>();
                }

                var alreadyAdded = post.Likes.filter((item) => {
                    return (item === req['userId']);
                });

                if (!alreadyAdded.length) {
                    post.Likes.push(req['userId']);
                } else {
                    if (req.query.remove) {
                        var index = post.Likes.findIndex((item) => {
                            return (item === req['userId'])
                        });
                        post.Likes.splice(index, 1);
                    } else {
                        return res.json({
                            Message: 'Post already added as favroite',
                            Success: true,
                            Content: { IsFav: true }
                        });
                    }
                }

                this.postingService.update(post._id.toString(), post, null, (err, item) => {
                    if (req.query.remove) {
                        return res.json({
                            Message: 'Post removed as favroite',
                            Success: true,
                            Content: { IsFav: false }
                        });
                    } else {
                        return res.json({
                            Message: 'Post added as favroite',
                            Success: true,
                            Content: { IsFav: true }
                        });
                    }
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
