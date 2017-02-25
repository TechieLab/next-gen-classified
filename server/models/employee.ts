import {BaseEntity} from './baseEntity';
import {Address} from './address';

export class Employee extends BaseEntity
{
     EmpId: string;
     Name: string;
     EmailId: string;
     Department: string;
     WorkStation : string;
     Designation : string;
     Address : Address;
     CompanyId : string
}