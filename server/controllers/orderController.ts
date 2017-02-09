import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Order } from '../models/order';



export interface IOrderController extends IBaseController<Order> {

}

export class OrderController extends BaseController<Order> implements IOrderController {

}
