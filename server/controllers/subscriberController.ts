import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Subscriber } from '../models/subscriber';


export interface ISubscriberController extends IBaseController<Subscriber> {

}

export class SubscriberController extends BaseController<Subscriber> implements ISubscriberController {

}