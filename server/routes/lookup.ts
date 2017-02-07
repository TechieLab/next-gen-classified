import {Express, Router, Request, Response} from 'express';
import {ILookupService,LookupService} from '../services/lookupService';
import {ILookupRepository,LookupRepository} from '../repository/lookupRepository';
import {LookupController,ILookupController} from '../controllers/lookupController';

export class LookupRoute
{
    lookupController: ILookupController;  
    service: ILookupService;  
    app: Express;

    constructor(app: Express)
    {
        this.app = app;      

        var repository = new LookupRepository()
        this.service = new LookupService(repository);
        this.lookupController = new LookupController(this.service);

        this.app.get('/api/lookups', (req: Request, res: Response) => {
             var key = req.query.key;

            this.lookupController.getEntityByQuery({key :key}, function(err, items){
                return res.json(items);
            });
        });
    }
}