import {Express, Router, Request, Response} from 'express';
import {ILookupService,LookupService} from '../services/lookupService';
import {ILookupRepository,LookupRepository} from '../repository/lookupRepository';
import {LookupController,ILookupController} from '../controllers/lookupController';
import logger = require('winston');

var self;
export class LookupRoute
{
    lookupController: ILookupController;  
    service: ILookupService;  
    app: Express;

    constructor(app: Express)
    {
        this.app = app;
        self = this;

        var repository = new LookupRepository()
        this.service = new LookupService(repository);
        this.lookupController = new LookupController(this.service);
    }

    getRoutes()
    {   
        this.app.get('/api/lookups', function(req: Request, res: Response){ 
            self.lookupController.getEntityByQuery(req.query, function(err, items){
                return res.json({data : items});
            });
        });

        //this.app.get('/api/lookups', this.lookupController.getEntities);
    }
}