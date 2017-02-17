import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Activity } from '../models/Activity';


export interface IActivityController extends IBaseController<Activity> {

}

export class ActivityController extends BaseController<Activity> implements IActivityController {

}
