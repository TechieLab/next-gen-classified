import { Express, Request, Response } from "express";
import logger = require('winston');
import { IBaseController, BaseController } from './baseController';
import { IOfferService, OfferService } from '../services/offerService';
import { IPostingService, PostingService } from '../services/postingService';
import { Post } from '../models/post';
import { Offer } from '../models/offer';
import { Result } from '../models/result';
import { Media } from '../models/media';

export interface IOfferController extends IBaseController<Offer> {
    create(req: Request, res: Response);
}

export class OfferController extends BaseController<Offer> implements IOfferController {
    
    public result: Result;

    constructor(public offerService: IOfferService,public postingService: IPostingService) {
        super(offerService);
    }

   public create(req: Request, res: Response) {
        var data = req.body;
        var offer = new Offer();

        offer.UserId = req['userId'];
        
        offer.Price = data.Price;
        offer.PostId = data.PostId;
        offer.Contact.PhoneNumber = data.PhoneNumber;
        offer.Contact.EmailId = data.Email;
        offer.Comments = data.Comments;

        logger.log('debug', 'PostingController creating post ----', offer);

         this.offerService.create(offer, (err, item) => {
            if (err) logger.log('debug', 'create posting err---', err);
        
        });

        this.postingService.getById(offer.PostId.toString(), (err, post) => {
                    if (err) logger.log('debug', 'create posting err---', err);

                    if (!post.Offers) {
                        post.Offers = new Array<string>();
                    }
                    
                    post.Offers.push(req['userId']);

                    this.postingService.update(offer.PostId.toString(),post ,{}, (err, post) => {
                        if (err) logger.log('debug', 'create posting err---', err);

                        if (post.Offers.indexOf(req['userId']) >= 0) {
                                this.result = {
                                    Message: 'Entity created',
                                    Success: true,
                                    Content: { MakeOffer: true }
                                };
                                return res.json(this.result);
                            } 
                    });
             });
    }
}