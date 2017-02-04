
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Company } from '../models/Company';


export interface ICompanyRepository extends IBaseRepository<Company> {

}

export class CompanyRepository extends BaseRepository<Company> implements ICompanyRepository {
   
    constructor( ) {
        super('companies');
    }
}

