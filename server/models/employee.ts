import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Employee extends BaseEntity
{
    public EmpId: string;
    public Name: string;
    public EmailId: string;
    public Department: string;
    public WorkStation : string;
    public Designation : string;
    public AddressId : ObjectID;
    public CompanyId : ObjectID
}