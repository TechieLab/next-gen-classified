
import { Employee } from '../models/Employee';
import { IEmployeeRepository } from '../repository/EmployeeRepository';
import logger = require('winston');
import { IBaseService, BaseService } from '../services/baseService';

export interface IEmployeeService extends IBaseService<Employee> {

}
export class EmployeeService extends BaseService<Employee> implements IEmployeeService {
    repository: IEmployeeRepository;

    public constructor(repository: IEmployeeRepository) {
        super(repository);
    }
}
