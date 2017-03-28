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
    getFavorite(req:Request, res:Response);
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
            console.log('sending request query-------------',req.query.remove);
            if (post) {
                if (!post.Likes) {
                    post.Likes = new Array<string>();
                }

                if(req.query.remove == "true"){
                    console.log('inside if condition sending request query-------------',req.query.remove);
                    var index:any = post.Likes.forEach((item,index)=>{
                          if((item === req['userId'])){
                              return index;
                          }
                    })
                     post.Likes.splice(index, 1);
                }else{
                      post.Likes.push(req['userId']);

                }

            
                console.log('before upadting post value-----------',post);
                this.postingService.update(post._id.toString(), post, {returnNewDocument : true}, (err, item) => {
                   console.log('in update method updating value is',item.Likes);
                    console.log('in update method updating value is',typeof(post.Likes.indexOf(req['userId'])));
                 
                    if (post.Likes.indexOf(req['userId']) >= 0) {
                        return res.json({
                            Message: 'Post added as favroite',
                            Success: true,
                            Content: { IsFav: true }
                        });
                    } else {
                        return res.json({
                            Message: 'Post remove as favroite',
                            Success: true,
                            Content: { IsFav: false }
                        });
                    }
                });
            }
        });
    }

    public getFavorite(req:Request, res:Response){
        logger.log('debug', 'posting base controller getAll------');
       
        this.postingService.get({Likes:{$gt:[]}}, (err, post) => {
            if (err) logger.log('debug', 'get err---', err);
            if(post){

                console.log('post fetching dataa------------',post);
               var alreadyAdded = post.filter((item:Post) => {
                    if(item.Likes.indexOf(req['userId']) >= 0){
                        return true;
                    }
                });
                console.log('already addedd',alreadyAdded);
                return res.json(alreadyAdded);
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
