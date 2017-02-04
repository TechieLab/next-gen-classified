
import { Db, Collection } from 'mongodb';
import logger = require('winston');
import { BaseRepository, IBaseRepository } from '../repository/baseRepository';
import { Employee } from '../models/Employee';


export interface IEmployeeRepository extends IBaseRepository<Employee> {

}

export class EmployeeRepository extends BaseRepository<Employee> implements IEmployeeRepository {
   
    constructor() {
        super('employees');
    }
}

