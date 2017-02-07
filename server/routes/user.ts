import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { ILookup } from '../models/lookup';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class UserRoute extends BaseApiRoute<ILookup> implements IBaseApiRoute<ILookup>{
    constructor(public app: Express) {
        super(app, "users");
    }
}