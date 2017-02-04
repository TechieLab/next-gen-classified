import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { ILookup } from '../models/lookup';

export interface ILookupController extends IBaseController<ILookup> {

}

export class LookupController extends BaseController<ILookup> implements ILookupController {

}
