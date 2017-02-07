import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { IProduct } from '../models/product';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class ProductRoute extends BaseApiRoute<IProduct> implements IBaseApiRoute<IProduct>{
    constructor(public app: Express) {
        super(app, "products");
    }
}