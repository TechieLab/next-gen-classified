import { Express, Router, Request, Response } from 'express';
import { ILookupService, LookupService } from '../services/lookupService';
import { ILookupRepository, LookupRepository } from '../repository/lookupRepository';
import { LookupController, ILookupController } from '../controllers/lookupController';

var self;

export class LookupRoute {
    app: Express;

    constructor(app: Express) {
        this.app = app;
        self = this;

        this.app.get('/api/lookups', (req: Request, res: Response) => {
            var key = req.query.key;

            var repository = new LookupRepository()
            var service = new LookupService(repository);
            var lookupController = new LookupController(service);

            lookupController.getAll(req, res);
        });
    }
}