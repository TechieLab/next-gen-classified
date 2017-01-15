import {BaseEntity} from './baseEntity';
import {ObjectID} from 'mongodb';

export class Report extends BaseEntity
{
    public Name: string;   
    public Type : string
    public UserId: ObjectID;
}