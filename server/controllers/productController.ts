import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Product } from '../models/product';

export interface IProductController extends IBaseController<Product> {

}

export class ProductController extends BaseController<Product> implements IProductController {

}
