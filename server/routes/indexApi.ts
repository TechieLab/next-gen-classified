
import {Express, Router, Request, Response} from 'express';
import logger = require('winston');
import {LookupRoute} from './lookup';
import {UserRoute} from './user';
import {AccountRoute} from './account'
import {PostRoute} from './post';
import {OfferRoute} from './offer';
import {ProfileRoute} from './profile';
export class IndexApiRoute
{ 
    constructor(private app : Express)
    { 
        new AccountRoute(app);
        new LookupRoute(app);
        new UserRoute(app);
        new PostRoute(app);
        new ProfileRoute(app);
        new OfferRoute(app);
    }  
}

