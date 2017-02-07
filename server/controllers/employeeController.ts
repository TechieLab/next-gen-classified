import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { IEmployee } from '../models/employee';



export interface IEmployeeController extends IBaseController<IEmployee> {

}

export class EmployeeController extends BaseController<IEmployee> implements IEmployeeController {

}
