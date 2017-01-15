
import { Company } from '../models/Company';
import { ICompanyRepository } from '../repository/CompanyRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface ICompanyService extends IBaseService<Company> {

}
export class CompanyService extends BaseService<Company> implements ICompanyService {
    repository: ICompanyRepository;

    public constructor(repository: ICompanyRepository) {
        super(repository);
    }
}
