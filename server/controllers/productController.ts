import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IProduct } from '../models/product';

export interface IProductController extends IBaseController<IProduct> {

}

export class ProductController extends BaseController<IProduct> implements IProductController {

}
