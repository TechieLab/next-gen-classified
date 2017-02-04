import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IPost} from '../models/post';

export module Controllers {

    export interface IOrderController extends IBaseController<Order> {
        
    }

    export class OrderController extends BaseController<Order> implements IOrderController
    {        
        
    }
}
