import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Offer } from '../models/offer';
import { ISearchController, SearchController } from '../controllers/searchController';

var self = this;
export class SearchRoute{
    searchController: ISearchController;

    constructor(public app: Express) {        
        self = this;

        this.get();       
    }

     get() {
        this.app.get('/api/search/', (req: Request, res: Response) => {
            logger.debug("route search----");
            self.setOfferCollection();
            this.searchController.perform(req, res);
        });
    } 
}