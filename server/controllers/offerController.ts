import { Express, Request, Response } from "express";
import logger = require('winston');
import { IBaseController, BaseController } from './baseController';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Offer } from '../models/offer';
import { Result } from '../models/result';
import { Media } from '../models/media';

export interface IOfferController {
    applyOffer(req: Request, res: Response);
}

export class OfferController implements IOfferController {
    public result: Result;

    constructor(public postingService : IPostingService){ }

    public applyOffer(req: Request, res: Response) {
        var data = req.body;
        var offer = new Offer();

        offer.UserId = req['userId'];
        offer.Price = data.Price;
        offer.Comments = data.Comments;

        logger.log('debug', 'PostingController creating post ----', offer);       

        this.postingService.getById(data.PostId.toString(), (err, post) => {
            if (err) logger.log('debug', 'getById err---', err);

            if (!post.Offers) {
                post.Offers = new Array<Offer>();
            }

            post.Offers.push(offer);

            this.postingService.update(post._id.toString(), post, {}, (err, post) => {
                if (err) logger.log('debug', 'update posting with offer err---', err);

                return res.json(post);
            });
        });
    }
}