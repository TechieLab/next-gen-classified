import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {ISubscriber} from '../models/subscriber';

export module Controllers {

    export interface ISubscriberController extends IBaseController<ISubscriber> {
        
    }

    export class SubscriberController extends BaseController<ISubscriber> implements ISubscriberController
    {        
        
    }
}
