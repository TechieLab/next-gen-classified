
import { Report } from '../models/Report';
import { IReportRepository } from '../repository/ReportRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IReportService extends IBaseService<Report> {

}
export class ReportService extends BaseService<Report> implements IReportService {
    repository: IReportRepository;

    public constructor(repository: IReportRepository) {
        super(repository);
    }
}
