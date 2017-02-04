import {Express, Request, Response} from "express";
import {IBaseController, BaseController} from './baseController';
import {IReport} from '../models/report';

export module Controllers {

    export interface IReportController extends IBaseController<IReport> {
        
    }

    export class ReportController extends BaseController<IReport> implements IReportController
    {        
        
    }
}
