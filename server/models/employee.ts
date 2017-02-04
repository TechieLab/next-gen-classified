import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface IEmployee extends IBaseEntity
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