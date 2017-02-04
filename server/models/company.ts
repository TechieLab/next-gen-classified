import {IBaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export interface ICompany extends IBaseEntity
{
     Name: string;
     Designation: string;    
     AddressId: string;
     ContactId: ObjectID; 
     MediaId: ObjectID;
     UserId : ObjectID;
}