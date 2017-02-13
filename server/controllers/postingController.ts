import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';

import { Post } from '../models/post';
import {Result} from '../models/result';

export interface IPostingController extends IBaseController<Post> {

}
var self;
export class PostingController extends BaseController<Post> implements IPostingController {

    public result: Result;

    constructor(public postingService: IPostingService) {
        super(postingService);
    }

    public createEntity(req: Request, res: Response) {
        var data = req.body;
        var post = new Post();

        post.Title = data.Title;
        post.Product.Description.Price = data.Price;
        post.Product.Description.PurchasedOn = data.PurchasedOn;
        post.Product.Description.Brand = data.Brand;
        post.Product.Description.Defects = data.Defects;
        post.Product.Category = data.Category;
        post.Location = data.Location;

        console.log(post);

        return this.postingService.create(data, (err, item) => {
            if (err) console.log(err);

            this.result = {
                Message: 'Entity created',
                Success: true,
                Content: item
            };

            return res.json(this.result);
        });
    }

}
