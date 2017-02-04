import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IActivity} from '../models/Activity';

export module Controllers {

    export interface IActivityController extends IBaseController<IActivity> {
        
    }

    export class ActivityController extends BaseController<IActivity> implements IActivityController
    {

    }
}
