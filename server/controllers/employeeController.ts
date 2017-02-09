import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Employee } from '../models/employee';



export interface IEmployeeController extends IBaseController<Employee> {

}

export class EmployeeController extends BaseController<Employee> implements IEmployeeController {

}
