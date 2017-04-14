import { Express, Router, Request, Response } from 'express';
import { ILookupService, LookupService } from '../services/lookupService';
import { ILookupRepository, LookupRepository } from '../repository/lookupRepository';
import { LookupController, ILookupController } from '../controllers/lookupController';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';
import {Lookup} from '../models/lookup';

var self;

export class LookupRoute extends BaseApiRoute<Lookup> implements IBaseApiRoute<Lookup> {
    app: Express;

    constructor(app: Express) {
        super(app, 'lookups');
        this.app = app;
        self = this;        
    }
}