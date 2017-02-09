import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Employee extends BaseEntity
{
     EmpId: string;
     Name: string;
     EmailId: string;
     Department: string;
     WorkStation : string;
     Designation : string;
     AddressId : ObjectID;
     CompanyId : ObjectID
}