
import {Express, Router, Request, Response} from 'express';
import logger = require('winston');
import {LookupRoute} from './lookup';
import {UserRoute} from './user';
import {PostRoute} from './post';
export class IndexApiRoute
{ 
    constructor(public app : Express)
    {   
        this.app = app;

        new LookupRoute(app);
        new UserRoute(app);
        new PostRoute(app);
    }  
}

