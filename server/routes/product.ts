import { Express, Router, Request, Response } from 'express';
import logger = require('winston');
import { Product } from '../models/product';
import { IBaseApiRoute, BaseApiRoute } from './baseApiRoute';

export class ProductRoute extends BaseApiRoute<Product> implements IBaseApiRoute<Product>{
    constructor(public app: Express) {
        super(app, "products");
    }
}