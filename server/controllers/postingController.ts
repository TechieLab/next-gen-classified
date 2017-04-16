import logger = require('winston');
import http = require('http');
import { ObjectID } from 'mongodb';
import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Result } from '../models/result';
import { Media } from '../models/media';
import { Settings } from '../config/settings'

export interface IPostingController extends IBaseController<Post> {
    get(req: Request, res: Response)
    create(req: Request, res: Response);
    upload(req: any, res: Response);
    addFavorite(req: Request, res: Response);
    getFavorite(req: Request, res: Response);
    search(req: Request, res: Response);
}
var self;
export class PostingController extends BaseController<Post> implements IPostingController {

    public result: Result;
    private options: any;

    constructor(public postingService: IPostingService) {
        super(postingService);
        this.options = {
            host: 'http://localhost:9200',
            path: '/search'
        };
    }

    public create(req: Request, res: Response) {
        var data = req.body;
        var post = new Post();

        post = <Post>data;
        post.UserId = req['userId'];

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
                media.Name = req.file.filename;
                media.ImageUrl = Settings.BackendHost + Settings.PostImageRepository + post._id + '/' + req.file.filename;
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
            console.log('sending request query-------------', req.query.remove);
            if (post) {
                if (!post.Likes) {
                    post.Likes = new Array<string>();
                }

                if (req.query.remove == "true") {
                    console.log('inside if condition sending request query-------------', req.query.remove);
                    var index: any = post.Likes.forEach((item, index) => {
                        if ((item === req['userId'])) {
                            return index;
                        }
                    })
                    post.Likes.splice(index, 1);
                } else {
                    post.Likes.push(req['userId']);

                }


                console.log('before upadting post value-----------', post);
                this.postingService.update(post._id.toString(), post, { returnNewDocument: true }, (err, item) => {
                    console.log('in update method updating value is', item);
                    console.log('in update method updating value is', typeof (post.Likes.indexOf(req['userId'])));

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

    public getFavorite(req: Request, res: Response) {
        logger.log('debug', 'posting controller getFavorite------');

        this.postingService.get({ Likes: { $gt: [] } }, (err, post) => {
            if (err) logger.log('debug', 'get err---', err);
            if (post) {
                var alreadyAdded = post.filter((item: Post) => {
                    if (item.Likes.indexOf(req['userId']) >= 0) {
                        return true;
                    }
                });
                return res.json(alreadyAdded);
            }
        });
    }

    search(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.query.searchText);
        if (req.query.elastic && req.query.elastic == true) {
            http.request(this.options, this.callback).end();
        } else {
            //if (this.initializeIndex()) {
            var searchCriteria = {
                "$text": {
                    "$search": req.query.searchText
                }
            };

            if (req.body.Category) {
                searchCriteria["Category"] = req.body.Category;
            }

            if (req.body.MinPrice) {
                searchCriteria["Product.Description.Price"] = {
                    $gte: +req.body.MinPrice
                };
            }

            if (req.body.MaxPrice) {
                searchCriteria["Product.Description.Price"] = {
                    $lte: +req.body.MaxPrice
                };
            }

            console.log("searchCriteria.........");
            console.log(searchCriteria);

            this.postingService.get(searchCriteria, (err, data) => {
                return res.json({ Content : data});
            });
            //}
        }
    }

    private callback = function (response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
        });
    }

    private initializeIndex() {
        return this.postingService.checkIndexes(['Title', 'Product.Description.Title'], (err, response) => {
            if (err) logger.debug('error checkIndexes', err);

            if (!response) {
                this.postingService.createIndexes([{ "Title": 'text' }, { "Product.Description.Title": "text" }], (error, result) => {
                    if (error) logger.debug('error creating index', error);

                    return result;
                });
            }
        })
    }

}
