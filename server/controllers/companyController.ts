import { Express, Request, Response } from "express";
import { IBaseController, BaseController } from './baseController';
import { ICompany } from '../models/company';


export interface ICompanyController extends IBaseController<ICompany> {

}

export class CompanyController extends BaseController<ICompany> implements ICompanyController {

}