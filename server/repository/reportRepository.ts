
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Report } from '../models/Report';



export interface IReportRepository extends IBaseRepository<Report> {

}

export class ReportRepository extends BaseRepository<Report> implements IReportRepository {
    
    constructor() {
        super('reports');
    }
} 
