import { IBaseController, BaseController } from './baseController';
import { Report } from '../models/report';

export interface IReportController extends IBaseController<Report> {

}

export class ReportController extends BaseController<Report> implements IReportController {

}
