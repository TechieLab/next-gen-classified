import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Company extends BaseEntity
{
     Name: string;
     Designation: string;    
     AddressId: string;
     ContactId: ObjectID; 
     MediaId: ObjectID;
     UserId : ObjectID;
}