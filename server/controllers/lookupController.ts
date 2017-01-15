import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {Lookup} from '../models/lookup';

export module Controllers {

    export interface ILookupController extends IBaseController<Lookup> {
        
    }

    export class LookupController extends BaseController<Lookup> implements ILookupController
    {        
        
    }
}
