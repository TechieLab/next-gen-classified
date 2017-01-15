import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Company extends BaseEntity
{
    public Name: string;
    public Designation: string;    
    public AddressId: string;
    public ContactId: ObjectID; 
    public MediaId: ObjectID;
    public UserId : ObjectID;
}