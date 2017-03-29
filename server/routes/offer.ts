import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Offer } from '../models/offer';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import { IOfferService, OfferService } from '../services/offerService';
import { IOfferRepository, OfferRepository } from '../repository/offerRepository';
import { IPostingService, PostingService } from '../services/postingService';
import { IPostingRepository, PostingRepository } from '../repository/postingRepository';
import { OfferController, IOfferController } from '../controllers/offerController';

var self = this;
export class OfferRoute extends BaseApiRoute<Offer> implements IBaseApiRoute<Offer>{
    offerController: IOfferController;
    repository: OfferRepository;
    service: OfferService;

    postingrepository: PostingRepository;
    postingService: PostingService;


    constructor(public app: Express) {
        super(app, 'offers');
        self = this;
        this.post();
    }

     post() {
        this.app.post('/api/' + this.apiName + '/', (req: Request, res: Response) => {
            logger.debug("route posting post----" + this.apiName);
            self.setOfferCollection();
            this.offerController.create(req, res);
        });
    }
  
    setOfferCollection() {
        var repository = new OfferRepository();
        var service = new OfferService(repository);
        
        this.postingrepository = new PostingRepository();
        this.postingService = new PostingService(this.postingrepository)
        
        this.offerController = new OfferController(service, this.postingService);
    }
}