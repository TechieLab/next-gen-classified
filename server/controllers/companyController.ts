import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { Company } from '../models/company';


export interface ICompanyController extends IBaseController<Company> {

}

export class CompanyController extends BaseController<Company> implements ICompanyController {

}