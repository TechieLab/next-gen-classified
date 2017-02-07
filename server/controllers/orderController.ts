import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IOrder } from '../models/order';



export interface IOrderController extends IBaseController<IOrder> {

}

export class OrderController extends BaseController<IOrder> implements IOrderController {

}
